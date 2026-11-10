const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error('Usage: node convert.js <input.xml.gz|input.xml> <output.json>');
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`❌ Input file not found: ${inputFile}`);
  process.exit(1);
}

// Decode common XML entities
function decodeXml(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    .trim();
}

// Extract text inside an XML tag: <tag ...>text</tag>
function extractTag(block, tag) {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = block.match(regex);
  return match ? decodeXml(match[1]) : '';
}

// Extract attribute from an XML tag: <tag attr="value">
function extractAttr(block, tag, attr) {
  const regex = new RegExp(`<${tag}\\b[^>]*?\\b${attr}=["']([^"']+)["']`, 'i');
  const match = block.match(regex);
  return match ? decodeXml(match[1]) : '';
}

// Convert XMLTV timestamp (YYYYMMDDHHMMSS +0530) to Unix Epoch seconds
function parseXmltvDate(dateStr) {
  if (!dateStr || dateStr.length < 14) return null;
  const year = parseInt(dateStr.slice(0, 4), 10);
  const month = parseInt(dateStr.slice(4, 6), 10) - 1;
  const day = parseInt(dateStr.slice(6, 8), 10);
  const hour = parseInt(dateStr.slice(8, 10), 10);
  const min = parseInt(dateStr.slice(10, 12), 10);
  const sec = parseInt(dateStr.slice(12, 14), 10);

  let offsetMinutes = 0;
  const offsetMatch = dateStr.slice(14).trim().match(/^([+-])(\d{2})(\d{2})/);
  if (offsetMatch) {
    const sign = offsetMatch[1] === '-' ? -1 : 1;
    offsetMinutes = sign * (parseInt(offsetMatch[2], 10) * 60 + parseInt(offsetMatch[3], 10));
  }

  const utcMs = Date.UTC(year, month, day, hour, min, sec) - (offsetMinutes * 60 * 1000);
  return Math.floor(utcMs / 1000);
}

// Keep past 24 hours + all current and future programmes
const cutoffTime = Math.floor(Date.now() / 1000) - (24 * 3600);

async function convert() {
  console.log(`🔄 Converting ${inputFile} -> ${outputFile}...`);

  let stream = fs.createReadStream(inputFile);
  if (inputFile.endsWith('.gz')) {
    stream = stream.pipe(zlib.createGunzip());
  }

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  const channelMap = new Map();
  const channels = [];
  let inBlock = null;
  let buffer = '';

  for await (const line of rl) {
    if (!inBlock) {
      if (line.includes('<channel ')) {
        inBlock = 'channel';
        buffer = line;
      } else if (line.includes('<programme ')) {
        inBlock = 'programme';
        buffer = line;
      }
    } else {
      buffer += '\n' + line;
    }

    if (inBlock === 'channel' && line.includes('</channel>')) {
      const id = extractAttr(buffer, 'channel', 'id');
      const name = extractTag(buffer, 'display-name') || id;
      const logo = extractAttr(buffer, 'icon', 'src');

      if (id) {
        const chObj = { id, name, logo, programs: [] };
        channelMap.set(id, chObj);
        channels.push(chObj);
      }
      inBlock = null;
      buffer = '';
    } else if (inBlock === 'programme' && line.includes('</programme>')) {
      const channelId = extractAttr(buffer, 'programme', 'channel');
      const chRef = channelMap.get(channelId);

      if (chRef) {
        const start = parseXmltvDate(extractAttr(buffer, 'programme', 'start'));
        const stop = parseXmltvDate(extractAttr(buffer, 'programme', 'stop'));

        if (start && stop && stop >= cutoffTime) {
          const title = extractTag(buffer, 'title') || 'Untitled Programme';
          const desc = extractTag(buffer, 'desc');
          const img = extractAttr(buffer, 'icon', 'src');

          const progObj = { s: start, e: stop, t: title };
          if (desc) progObj.d = desc;
          if (img) progObj.img = img;

          chRef.programs.push(progObj);
        }
      }
      inBlock = null;
      buffer = '';
    }
  }

  // Sort programmes chronologically and filter out empty channels
  const validChannels = channels.filter(ch => {
    if (ch.programs.length === 0) return false;
    ch.programs.sort((a, b) => a.s - b.s);
    return true;
  });

  const payload = {
    updated: Math.floor(Date.now() / 1000),
    channels: validChannels
  };

  fs.writeFileSync(outputFile, JSON.stringify(payload));
  const sizeMb = (fs.statSync(outputFile).size / (1024 * 1024)).toFixed(2);
  console.log(`✅ Saved ${validChannels.length} channels to ${outputFile} (${sizeMb} MB)`);
}

convert().catch(err => {
  console.error('❌ Conversion failed:', err);
  process.exit(1);
});
