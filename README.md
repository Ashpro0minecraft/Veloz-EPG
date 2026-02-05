<p align="center">
  <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="640" viewBox="0 0 1280 640" role="img" aria-label="Veloz EPG Hub banner">
  <defs>
    <!-- Blue palette -->
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"  stop-color="#050B1E"/>
      <stop offset="45%" stop-color="#071A3A"/>
      <stop offset="100%" stop-color="#0B3A6E"/>
    </linearGradient>

    <radialGradient id="glow" cx="55%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#7DD3FC" stop-opacity="0.35"/>
      <stop offset="45%" stop-color="#38BDF8" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#0B3A6E" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="titleFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E0F2FE"/>
      <stop offset="55%" stop-color="#7DD3FC"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>

    <linearGradient id="chipFill" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0B2B58"/>
      <stop offset="100%" stop-color="#062046"/>
    </linearGradient>

    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.35"/>
    </filter>

    <filter id="titleGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="10" result="blur"/>
      <feColorMatrix in="blur" type="matrix"
        values="1 0 0 0 0.2
                0 1 0 0 0.7
                0 0 1 0 1
                0 0 0 0.8 0" result="glow"/>
      <feMerge>
        <feMergeNode in="glow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#7DD3FC" stroke-opacity="0.08" stroke-width="2"/>
    </pattern>

    <style>
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
      .sans { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="1280" height="640" fill="url(#bg)"/>
  <rect width="1280" height="640" fill="url(#glow)"/>
  <rect width="1280" height="640" fill="url(#grid)"/>

  <!-- Decorative arcs -->
  <g opacity="0.22">
    <path d="M-140,520 C180,360 420,720 720,540 C980,385 1110,430 1420,260"
          fill="none" stroke="#38BDF8" stroke-width="18" stroke-linecap="round"/>
    <path d="M-170,560 C160,400 420,760 720,580 C1000,420 1120,470 1460,300"
          fill="none" stroke="#7DD3FC" stroke-width="8" stroke-linecap="round"/>
  </g>

  <!-- Top-left mini badge -->
  <g transform="translate(70,70)" filter="url(#softShadow)">
    <rect x="0" y="0" rx="18" ry="18" width="260" height="54" fill="url(#chipFill)" stroke="#38BDF8" stroke-opacity="0.35"/>
    <circle cx="28" cy="27" r="10" fill="#38BDF8"/>
    <text x="52" y="35" class="mono" font-size="20" fill="#E0F2FE" opacity="0.95">goveloz.me</text>
  </g>

  <!-- Main title -->
  <g transform="translate(0,0)" filter="url(#titleGlow)">
    <text x="640" y="220" text-anchor="middle" class="sans" font-size="120" font-weight="900"
          fill="url(#titleFill)" letter-spacing="2">VELOZ</text>
    <text x="640" y="320" text-anchor="middle" class="sans" font-size="86" font-weight="800"
          fill="#BAE6FD" opacity="0.98" letter-spacing="1.5">EPG HUB</text>
  </g>

  <!-- Subtitle -->
  <text x="640" y="380" text-anchor="middle" class="sans" font-size="26" font-weight="700"
        fill="#E0F2FE" opacity="0.9" letter-spacing="3">
    FAST • RELIABLE • IPTV EPG SOURCES
  </text>

  <!-- Feature chips -->
  <g transform="translate(640,460)" filter="url(#softShadow)">
    <g transform="translate(-420,0)">
      <rect x="0" y="0" rx="22" ry="22" width="240" height="56" fill="url(#chipFill)" stroke="#7DD3FC" stroke-opacity="0.28"/>
      <text x="120" y="36" text-anchor="middle" class="mono" font-size="22" fill="#E0F2FE">XMLTV</text>
    </g>
    <g transform="translate(-150,0)">
      <rect x="0" y="0" rx="22" ry="22" width="240" height="56" fill="url(#chipFill)" stroke="#7DD3FC" stroke-opacity="0.28"/>
      <text x="120" y="36" text-anchor="middle" class="mono" font-size="22" fill="#E0F2FE">GZIP (.xml.gz)</text>
    </g>
    <g transform="translate(120,0)">
      <rect x="0" y="0" rx="22" ry="22" width="240" height="56" fill="url(#chipFill)" stroke="#7DD3FC" stroke-opacity="0.28"/>
      <text x="120" y="36" text-anchor="middle" class="mono" font-size="22" fill="#E0F2FE">CDN READY</text>
    </g>
  </g>

  <!-- Bottom hint -->
  <text x="640" y="590" text-anchor="middle" class="mono" font-size="18"
        fill="#93C5FD" opacity="0.85">
    Airtel • Tata Play • DishTV  —  Updated EPG feeds on epg.goveloz.me
  </text>

  <!-- Corner dots -->
  <g opacity="0.35">
    <circle cx="1160" cy="110" r="6" fill="#38BDF8"/>
    <circle cx="1190" cy="140" r="4" fill="#7DD3FC"/>
    <circle cx="1220" cy="110" r="3" fill="#E0F2FE"/>
    <circle cx="1180" cy="170" r="3" fill="#E0F2FE"/>
  </g>
</svg>
</p>

<h1 align="center">📺 Veloz EPG Hub</h1>

<p align="center">
  <b>Fast • Reliable • Plug & Play IPTV EPG Sources</b>
</p>

<p align="center">
  <a href="https://goveloz.me">
    <img src="https://img.shields.io/badge/Website-goveloz.me-blue?style=for-the-badge">
  </a>
  <img src="https://img.shields.io/badge/EPG-XMLTV-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/Compression-GZIP-orange?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/IPTV-Compatible-informational?style=for-the-badge">
</p>

---

## 🚀 About Veloz EPG

**Veloz EPG Hub** is a high-performance **Electronic Program Guide (EPG)** service built for IPTV users who want **accurate schedules**, **fast loading**, and **zero configuration hassle**.

This project provides **ready-to-use XMLTV EPG sources** for popular Indian DTH / IPTV platforms.

🌐 **Official Website**  
👉 https://goveloz.me

---

## 🔗 Available EPG Sources

All EPG files are publicly accessible and regularly updated.

### 📡 Airtel Digital TV

https://epg.goveloz.me/airtel.xml.gz

### 📡 Tata Play

https://epg.goveloz.me/tataplay.xml.gz

### 📡 Dish TV

https://epg.goveloz.me/dishtv.xml.gz

📌 All EPG files are **GZIP-compressed (`.xml.gz`)** for:
- Faster loading
- Reduced bandwidth usage
- Better compatibility with IPTV apps

---

## ✨ Features

✔ Clean & structured **XMLTV format**  
✔ Compatible with most IPTV players  
✔ Fast global CDN delivery  
✔ No authentication required  
✔ No ads, no tracking  
✔ Free for personal & community use  
✔ Stable & production-ready  

---

## ⚙️ How to Use

### Step 1️⃣ Copy an EPG URL
Choose the EPG link matching your IPTV provider.

### Step 2️⃣ Open Your IPTV App
Works with:
- TiviMate  
- IPTV Smarters  
- OTT Navigator  
- Perfect Player  
- Kodi (IPTV Simple Client)  
- And many more  

### Step 3️⃣ Paste the EPG URL
Paste the `.xml.gz` link into the **EPG / XMLTV URL** field.

### Step 4️⃣ Refresh EPG
Reload or refresh EPG inside your app.

🎉 Done! Your channel guide will populate automatically.

---

## 🧠 Technical Details

| Property        | Value |
|-----------------|------|
| Format          | XMLTV |
| Compression     | GZIP |
| Encoding        | UTF-8 |
| Hosting         | Cloudflare CDN |
| Availability    | High uptime |
| Update Cycle    | Regular |

---

## 🌐 Veloz Ecosystem

This repository is part of the **Veloz platform**, focused on building:

- IPTV utilities  
- EPG services  
- Streaming infrastructure  
- Network & media tools  

Explore more projects at 👉 **https://goveloz.me**

---

## 📜 License & Usage

- ✅ Free for personal use  
- ✅ Free for educational & testing purposes  
- ✅ Redistribution allowed with proper credit  
- ❌ Commercial resale of EPG data is not permitted  

If you use this project publicly, please credit **Veloz EPG Hub**.

---

## 🤝 Contributing

Contributions are welcome!

- Open issues for bugs or feature requests  
- Submit pull requests for improvements  
- Share ideas to improve IPTV tooling  

Let’s build better IPTV infrastructure together 🚀

---

## ⭐ Support the Project

If this project helped you:

- ⭐ Star this repository  
- 🌐 Share **goveloz.me**  
- 💙 Support open IPTV tools  

Your support keeps the project alive.

---

<p align="center">
  © 2025 <b>Veloz Innovations Pvt. Ltd.</b><br>
  Built with ❤️ for the IPTV community
</p>
