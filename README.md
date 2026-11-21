# 🔮 Privacy Lens — In-Browser Cybersecurity Privacy Suite

> **Client-Side Sensitive Data Detection & Privacy Masking Web Application**  
> Built with HTML5, CSS3 Glassmorphism, Vanilla ES6 JavaScript, Tesseract.js OCR, and JSZip.  
> Deployable on **Vercel** with zero backend configuration.

---

## 🧭 Architecture Overview

### 1. Landing Page (`index.html`)
- **Preserved exactly as requested**:
  - Hero Section with Holographic Flow + Midnight Glass aesthetics.
  - Interactive Preview Showcase with simulated scanner laser & pink bounding boxes.
  - Metrics Strip (0 Bytes Uploaded, < 1.2s Latency, 8+ Formats).
  - 4-Step Cyberpunk Workflow.
  - Features, Architecture Comparison Table, and Use Cases.
  - Calls to action navigate seamlessly to the new **Cybersecurity Dashboard** (`app.html`).

---

### 2. Cybersecurity Dashboard (`app.html`)
Features a **permanent left sidebar** containing 8 dedicated, fully functional modules:

| # | Sidebar Module | Core Functionality |
| :- | :--- | :--- |
| **1** | **Dashboard** | KPI metrics (Images Analyzed, Leaks Found, Protected Count, Risk Level), threat distribution chart, recent activity logs with localStorage persistence. |
| **2** | **Smart Text Detection** | Optical Character Recognition (OCR) via `Tesseract.js`. Flags phones, emails, Aadhaar, PAN, bank accounts, passwords, IP addresses. Interactive bounding boxes + raw text extractor. |
| **3** | **Face Detection** | Automated in-browser human face detection (native `FaceDetector` API + client-side facial clustering fallback). Anonymize with Gaussian Blur, Pixelation, Blackout, or Cyber Visor. |
| **4** | **Smart Redaction** | Canvas editor with interactive click-and-drag custom box drawer. Mask styles: Gaussian Blur, Midnight Redaction (`[PROTECTED]`), and Mosaic Pixelate with adjustable intensity. |
| **5** | **Privacy Risk Score** | Rule-based weighted risk calculation (0-100). Animated circular SVG threat gauge. Itemized risk reasons, privacy improvement recommendations, and 1-click auto-mitigation. |
| **6** | **Before & After Comparison** | Interactive dual-layer split slider (drag to reveal original vs protected in real time) + side-by-side synchronized comparison. |
| **7** | **Batch Image Protection** | Multi-file queue processor with live progress bar. Analyzes all images, displays glass cards grid, and downloads individually or as a single **ZIP archive** (via `JSZip`). |
| **8** | **Metadata Scanner** | Binary EXIF parser extracting GPS coordinates (with Google Maps location alert), camera make/model, timestamps, and lens. 1-click binary EXIF stripping & clean download. |

---

## 🎨 Design System & Environments

### 1. Landing Page (`index.html`)
- **Visual Style**: Cyberpunk Midnight Obsidian (`#06020e` to `#12072e`) with animated holographic sine waves and stardust particles.

### 2. Cybersecurity Dashboard (`app.html`)
- **Visual Style**: Premium Light Futuristic 3D Environment (**White, Icy Blue & Lavender Palette**).
- **Animated 3D Background**:
  - **Flowing 3D Ribbon Waves**: Multi-frequency harmonic ribbon waves in icy blue, lavender, cyan, and soft purple with liquid specular crests.
  - **Floating Translucent Glass Bubbles**: Multi-depth floating glass spheres with realistic crescent reflections, internal refraction glow, and soft depth shadows.
  - **Rotating Transparent 3D Rings**: Mathematical 3D glass rings with perspective division and specular rims slowly turning in space (No shields, no padlocks).
  - **Sparkling Particles**: Micro-diamond stardust particles twinkling with cyan and lavender glows.
  - **Ambient Lighting**: Soft breathing cyan & violet light mesh with mouse-reactive parallax.
- **Glassmorphism**: Pristine light frosted glass cards (`rgba(255, 255, 255, 0.76)`), crisp high-contrast midnight slate typography (`#0f172a`), and vibrant violet-to-cyan holographic buttons.

---

## 🚀 Local Development & Testing

```bash
# Using Node.js
npx serve .

# Or using Python
python -m http.server 3000
```
- **Landing Page**: `http://localhost:3000` (or open [index.html](file:///c:/privacylens/index.html))
- **Dashboard**: `http://localhost:3000/app.html` (or open [app.html](file:///c:/privacylens/app.html))

---

## ☁️ Vercel Deployment

Zero configuration required:
```bash
npx vercel
```
Or connect your GitHub repository to Vercel for automatic deployment on every push.
