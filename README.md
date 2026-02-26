# Peace W. Mutuota Portfolio

This repository contains the source code for a personal portfolio website for **Peace W. Mutuota**, an international relations and public policy professional. The site showcases biography, skills, experience, leadership, education, certifications, and contact information.

## 🗂️ Project Structure

```
peace/
├── index.html                     # main HTML file with all sections
├── README.md                      # this file
├── assets/
│   ├── css/
│   │   ├── style.css              # base/reset/variables
│   │   ├── layout.css             # layout, navigation, hero, sections
│   │   ├── components.css         # cards, buttons, gallery, footer
│   │   ├── animations.css         # keyframes, reveals, transitions
│   │   └── responsive.css         # media queries and responsive tweaks
│   ├── js/
│   │   └── main.js                # interactions: menu, lightbox, scroll effects
│   ├── img/                       # images used by site (profile, certificates)
│   └── documents/                 # downloadable docs (CV, certificates)
└── assets/css/... (other files)   # existing structure
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- (Optional) A local web server for development (e.g. `Live Server` extension in VS Code)

### Running Locally

1. Clone or download the repository.
2. Open the workspace folder in VS Code or your editor of choice.
3. Open `index.html` directly or serve the folder using a simple HTTP server:
   ```bash
   # using Python 3
   python -m http.server
   ```
4. Navigate to `http://localhost:8000` (or file path) to view the site.

## 🛠️ Features & Enhancements

- Responsive layout working across devices (mobile, tablet, desktop).
- Scroll reveal animations for sections.
- Mobile navigation with hamburger toggle and active section indicator.
- Back-to-top button and fixed header with scroll shadow.
- Certificates section with gallery and lightbox viewer; downloads disabled.
- CSS custom properties for theming (deep navy primary and executive gold accent).
- Accessibility improvements: skip link, keyboard navigation, focus states, reduced-motion support.
- Print-friendly stylesheet and high-contrast support.
- Lazy-loading of images and smooth scrolling offsets.

## 🎨 Customization

- Colors: edit CSS variables in `assets/css/style.css`.
- Add/remove sections in `index.html`; ensure to update navigation links accordingly.
- Certificates: place PNGs under `assets/documents/` and update the gallery in `index.html`.

## 📦 Deployment

Simply upload the contents of the repository to any static hosting provider (GitHub Pages, Netlify, Vercel, etc.).

## 📝 Credits

Built and maintained by Peace W. Mutuota. Icons or fonts used are from Google Fonts (`Playfair Display`, `Inter`).

## 📄 License

This project is provided for demonstration purposes and may be adapted freely.

---

_Last updated: February 2026._