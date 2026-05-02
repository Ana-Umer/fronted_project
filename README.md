# GeoTour: GIS-Based Tourism Information Website 🌍

GeoTour is a modern, responsive, and interactive static website designed to provide detailed tourism information using Geographic Information System (GIS) concepts. Specifically curated for **Ethiopia**, the platform helps travelers explore breathtaking destinations, view exact locations on interactive maps, and access essential travel guides and tips.

---

## ✨ Key Features

- **Interactive GIS Map (`map.html`)**: Powered by [Leaflet.js](https://leafletjs.com/), featuring real-world GPS coordinates and interactive markers for top Ethiopian destinations.
- **Dynamic Filtering (`destinations.html`)**: Easily filter destinations by categories like Parks, Lakes, Mountains, and Cultural Sites using Vanilla JavaScript.
- **Modern UI/UX**: Premium aesthetic featuring glassmorphism, responsive CSS grid/flexbox layouts, smooth hover animations, and a polished dark-mode aesthetic for maps and services.
- **Form Validation (`contact.html`)**: Custom client-side JavaScript validation for the contact form to ensure proper name, email, and phone number inputs before submission.
- **Mobile-First & Responsive**: Fully optimized for desktops, tablets, and smartphones.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic markup for accessibility and clear page structure.
- **CSS3 (Vanilla)**: Custom styling using CSS variables (custom properties), flexbox, grid, and keyframe animations. No external UI frameworks were used, ensuring a lightweight footprint.
- **JavaScript (Vanilla)**: DOM manipulation, event listeners, form validation, and scroll animations (Intersection Observer API).
- **Leaflet.js & OpenStreetMap**: Integrated for rendering the interactive geographical map and custom marker plots.

---

## 📂 Project Structure

```text
static_website/
│
├── index.html           # Home page with hero section and featured spots
├── about.html           # Project mission, objectives, and team info
├── destinations.html    # Full catalog of destinations with category filtering
├── map.html             # Full-width interactive GIS map with location cards
├── services.html        # Travel tips, safety info, and planning guides
├── contact.html         # Contact form with validation and FAQ
│
├── css/
│   └── style.css        # Main stylesheet (variables, components, responsive rules)
│
├── js/
│   └── script.js        # Main JavaScript logic (map init, filters, animations)
│
└── images/              # Project imagery and generated assets
    ├── hero_banner.png
    └── destination_temple.png
```

---

## 🚀 How to Run Locally

Since this is a fully static website without a backend database, running it locally is incredibly simple:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ana-Umer/fronted_project.git
   cd fronted_project
   ```

2. **Open the project**:
   - Simply double-click `index.html` to open it in your default web browser.
   - *Alternatively*, for the best experience (and to avoid CORS issues with local assets), use a local development server like **VS Code Live Server** or Python's built-in server:
     ```bash
     python -m http.server 8080
     ```
     Then open `http://localhost:8080` in your browser.

---


---

## 📜 License

© 2026 GeoTour. Built for educational and demonstration purposes.
