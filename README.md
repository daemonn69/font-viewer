# 🔤 Font Viewer

A sleek, modern web application for previewing and inspecting font files. Upload any font (TTF, OTF, WOFF, WOFF2) and explore it in detail — all in your browser, no server required.

![Font Viewer](https://img.shields.io/badge/version-1.0-7C3AED?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-EC4899?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Features

### 📂 Font Upload
- **Drag & Drop** — just drag a font file onto the page
- **Click to browse** — or select a file manually
- Supports `.ttf`, `.otf`, `.woff`, `.woff2`

### 🔍 5 Preview Modes

| Tab | Description |
|-----|-------------|
| **Preview** | Free-text editor with live font rendering |
| **Paragraph** | Sample paragraphs in Latin & Cyrillic |
| **Waterfall** | Same text rendered in sizes from 8px to 96px |
| **Glyphs** | Full character map with search & category filters |
| **Info** | Font metadata, Cyrillic/Latin support detection |

### 🎛️ Customization
- **Font size** slider (8–200px)
- **Letter spacing** control
- **Line height** adjustment
- **Text color** and **background color** pickers

### 🌐 Bilingual UI
- English by default
- Switch to Russian with one click
- Language preference saved in browser

### 🌗 Dark / Light Theme
- Beautiful dark mode with glassmorphism effects
- Clean light mode alternative
- Theme preference saved in browser

---

## 🚀 Getting Started

No build tools, no dependencies, no server required!

### Option 1: Open locally
1. Clone the repo:
   ```bash
   git clone https://github.com/daemonn69/font-viewer.git
   ```
2. Open `index.html` in your browser

### Option 2: Use a local server (optional)
```bash
cd font-viewer
npx serve .
```

---

## 📁 Project Structure

```
font-viewer/
├── index.html    # Main page with semantic HTML
├── style.css     # Styles with CSS variables, themes, animations
├── app.js        # Application logic, i18n, font loading
└── README.md     # This file
```

---

## 🛠️ Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, glassmorphism, gradients, animations
- **Vanilla JavaScript** — FontFace API, drag & drop, Canvas API for font metrics
- **Google Fonts** — Inter for the UI typeface
- **Zero dependencies** — no frameworks, no build step

---

## 🎨 Design Highlights

- 🟣 Purple-pink gradient accent palette
- 🔮 Glassmorphism with `backdrop-filter: blur()`
- ✨ Micro-animations on hover and interactions
- 📱 Fully responsive layout
- 🎯 Accessible color contrast

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with 💜 by <a href="https://github.com/daemonn69">daemonn69</a>
</p>
