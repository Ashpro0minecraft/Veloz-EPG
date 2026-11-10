const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

console.log("Reading XML file...");
const xmlData = fs.readFileSync('tataplay.xml', 'utf8');

console.log("Parsing XML...");
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });
const jsonObj = parser.parse(xmlData);

const epgData = [];
const channelMap = {};

// 1. Map all channels with their logos
if (jsonObj.tv && jsonObj.tv.channel) {
    const channels = Array.isArray(jsonObj.tv.channel) ? jsonObj.tv.channel : [jsonObj.tv.channel];
    channels.forEach(ch => {
        const id = ch.id;
        channelMap[id] = {
            id: id,
            name: ch['display-name'] || 'Unknown Channel',
            logo: ch.icon ? ch.icon.src : '',
            programs: []
        };
        epgData.push(channelMap[id]);
    });
}

// 2. Map programs to their respective channels
if (jsonObj.tv && jsonObj.tv.programme) {
    const programs = Array.isArray(jsonObj.tv.programme) ? jsonObj.tv.programme : [jsonObj.tv.programme];
    programs.forEach(prog => {
        if (channelMap[prog.channel]) {
            channelMap[prog.channel].programs.push({
                title: prog.title || 'No Title',
                start: prog.start, // Format: 20261110053000 +0530
                stop: prog.stop,
                desc: prog.desc || ''
            });
        }
    });
}

// 3. Save as a highly compressed JSON file
fs.writeFileSync('epg.json', JSON.stringify(epgData));
console.log("✅ Successfully converted to epg.json");
