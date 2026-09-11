# ImgTool Studio — All-in-One Image Toolkit

Free, privacy-first image toolkit that runs **100% in your browser**. No upload, no server, no tracking.

**Live Demo:** Run `python3 -m http.server 8000` and open `index.html`

## ✨ Features

### 🗜️ Smart Compression
- Quality slider (1-100%)
- Output: Original / JPG / PNG / WebP
- Live file size estimation & savings %
- Keep EXIF toggle

### ↔️ Resize
- Pixel width/height with aspect lock
- Percentage scale (10-200%)
- Presets: 1920×1080 FHD, 1280×720 HD, 1080×1080 Instagram, 1200×628 OG, 1080×1920 Story
- Fit modes: Cover / Contain / Stretch

### ⇄ Convert Format
- JPG ↔ PNG ↔ WebP
- Quality control for lossy formats
- Batch convert + ZIP download
- Transparency warning for JPG

### ◫ Crop
- Draggable crop box with 8 handles
- Aspect presets: Free, 1:1, 4:3, 16:9, 3:2, 9:16
- Grid overlay, live X/Y/W/H display

### ↻ Rotate & Flip
- Rotate 90° left/right
- Flip horizontal/vertical
- Straighten slider (-45° to +45°)

### ◍ Adjust & Filters
- Brightness, Contrast, Saturation, Blur, Hue
- Toggles: Grayscale, Sepia, Invert
- Live canvas preview using `ctx.filter`

### ✦ Watermark
- Text, size, opacity, color
- 9-position grid (TL → BR)
- Shadow for readability

### Extras
- **Batch mode:** Drop multiple images, select, delete, ZIP export (via JSZip)
- **History:** Undo/Redo (Ctrl+Z / Ctrl+Y), 20 steps
- **Compare:** Original vs Edited slider (press C)
- **Zoom:** 25-300%
- **Input methods:** Drag & Drop, Browse, Paste (Ctrl+V / button), Sample images
- **Privacy badge:** Offline, no upload, works after first load
- **Dark/Light theme** with localStorage
- **Responsive:** Mobile bottom toolbar, desktop sidebar
- **Checkerboard** background for transparency

## 🛠️ Tech Stack
- **Static single-page** — no build step
- **Tailwind CDN** + custom glassmorphism UI
- **Vanilla JS** + Canvas API
- **JSZip** for batch ZIP
- **Inter + JetBrains Mono** fonts

## 📂 Structure
```
/index.html  — entire app (HTML/CSS/JS in one file, ~81KB)
```

## 🚀 Usage
```bash
# Local preview
python3 -m http.server 8000
# or
npx serve .
```
Open http://localhost:8000

## 🔒 Privacy
All processing uses `<canvas>` and `toBlob()` locally. Images never leave your device. No cookies, no analytics.

## 📝 Shortcuts
- `Ctrl+V` / Paste button → paste image
- `Ctrl+Z` / `Ctrl+Y` → undo/redo
- `C` → toggle compare
- Drag crop box & handles → crop
- Shift + drag handle → lock ratio (via preset)

## 🎨 Design
- Rounded-2xl cards, soft shadows
- Gradient brand (sky → violet → fuchsia)
- 13px UI typography, mono for metrics
- Emerald savings bar, amber warnings

Built for creators, developers, designers who care about speed & privacy.
