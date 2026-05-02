/* =============================================
   GIS TOURISM WEBSITE - MAIN SCRIPT
   ============================================= */

// ── NAVBAR ──────────────────────────────────
const navbar  = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar?.classList.add('scrolled');
  else navbar?.classList.remove('scrolled');
});

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
  const bars = hamburger.querySelectorAll('span');
  if (hamburger.classList.contains('open')) {
    bars[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    bars[1].style.opacity   = '0';
    bars[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
  }
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.querySelectorAll('span').forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
  });
});

// Active link highlight
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── SCROLL ANIMATIONS ────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── COUNTER ANIMATION ────────────────────────
function animateCounter(el, target, suffix = '') {
  let count = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count + suffix;
    if (count >= target) clearInterval(timer);
  }, 25);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('.stat-number[data-target]');
      nums.forEach(el => {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
      });
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(el => statsObserver.observe(el));

// ── LEAFLET MAP ──────────────────────────────
function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  const map = L.map('map', { zoomControl: true, scrollWheelZoom: false }).setView([9.1450, 40.4897], 5);
  window.map = map;

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd', maxZoom: 19
  }).addTo(map);

  const customIcon = (color) => L.divIcon({
    html: `<div style="
      width:36px;height:36px;
      background:${color};
      border:3px solid #fff;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      box-shadow:0 3px 14px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [36, 36], iconAnchor: [18, 36], className: ''
  });

  const destinations = [
    { name: 'Simien Mountains', lat: 13.1492, lng: 38.0371, type: 'mountain', color: '#ef4444', desc: 'Dramatic mountain ranges with deep valleys and jagged peaks, home to the Gelada baboons.' },
    { name: 'Lake Tana', lat: 12.0000, lng: 37.3000, type: 'lake', color: '#06b6d4', desc: 'The source of the Blue Nile and the largest lake in Ethiopia, featuring ancient island monasteries.' },
    { name: 'Omo Valley', lat: 5.8647, lng: 35.6033, type: 'park', color: '#0a7c5c', desc: 'A culturally diverse region known for its indigenous tribes and pristine natural landscapes.' },
    { name: 'Lalibela Churches', lat: 12.0315, lng: 39.0411, type: 'cultural', color: '#f59e0b', desc: 'Famous for its monolithic rock-hewn churches dating back to the 12th and 13th centuries.' },
    { name: 'Danakil Depression', lat: 14.2417, lng: 40.3000, type: 'park', color: '#0a7c5c', desc: 'One of the hottest and lowest places on Earth, featuring neon-colored sulfuric springs and salt flats.' },
    { name: 'Langano Beach', lat: 7.6000, lng: 38.7167, type: 'beach', color: '#8b5cf6', desc: 'A popular resort lake with brown waters and sandy beaches, safe for swimming and water sports.' },
    { name: 'Bale Mountains', lat: 6.8833, lng: 39.8167, type: 'mountain', color: '#ef4444', desc: 'A high-altitude plateau and forest, home to the rare Ethiopian wolf and endemic birds.' },
    { name: 'Fasil Ghebbi, Gondar', lat: 12.6075, lng: 37.4697, type: 'cultural', color: '#f59e0b', desc: 'A fortress-city of royal castles and palaces, often called the Camelot of Africa.' },
    { name: 'Sof Omar Cave', lat: 6.9038, lng: 40.7511, type: 'park', color: '#0a7c5c', desc: 'One of the most spectacular and extensive underground cave systems in the world, carved by the Weyib River.' },
    { name: 'Gara Muleta', lat: 9.2500, lng: 41.7333, type: 'mountain', color: '#ef4444', desc: 'A prominent mountain in eastern Ethiopia known for its rich biodiversity, indigenous forests, and stunning panoramic views.' },
  ];

  const typeColors = { park: '#0a7c5c', lake: '#06b6d4', cultural: '#f59e0b', mountain: '#ef4444', beach: '#8b5cf6' };

  destinations.forEach(dest => {
    const marker = L.marker([dest.lat, dest.lng], { icon: customIcon(dest.color) }).addTo(map);
    marker.bindPopup(`
      <div style="font-family:Inter,sans-serif;min-width:200px;">
        <h3 style="font-size:1rem;font-weight:700;color:#0f172a;margin:0 0 6px;">${dest.name}</h3>
        <span style="background:${dest.color};color:#fff;font-size:0.72rem;font-weight:600;padding:3px 10px;border-radius:50px;text-transform:capitalize;">${dest.type}</span>
        <p style="font-size:0.85rem;color:#64748b;margin:8px 0 0;line-height:1.5;">${dest.desc}</p>
      </div>
    `, { maxWidth: 260 });
  });

  // Legend update if on map page
  const legend = document.querySelector('.map-legend');
  if (legend) {
    const types = Object.entries(typeColors);
    legend.innerHTML = types.map(([type, color]) => `
      <div class="legend-item">
        <div class="legend-dot" style="background:${color};"></div>
        <span style="text-transform:capitalize;">${type}</span>
      </div>
    `).join('');
  }
}

// Load Leaflet dynamically if map element exists
if (document.getElementById('map')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet'; link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  script.onload = initMap;
  document.head.appendChild(script);
}

// ── DESTINATION FILTER ───────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const destCards  = document.querySelectorAll('.dest-filter-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    destCards.forEach(card => {
      if (cat === 'all' || card.dataset.category === cat) {
        card.style.display = '';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// ── CONTACT FORM VALIDATION ──────────────────
const form = document.getElementById('contactForm');

function showError(input, msg) {
  input.classList.add('error');
  const errEl = input.nextElementSibling;
  if (errEl && errEl.classList.contains('error-msg')) {
    errEl.textContent = msg; errEl.classList.add('show');
  }
}
function clearError(input) {
  input.classList.remove('error');
  const errEl = input.nextElementSibling;
  if (errEl && errEl.classList.contains('error-msg')) errEl.classList.remove('show');
}
function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function isValidPhone(phone) { return /^\+?[\d\s\-()]{7,15}$/.test(phone); }

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name  = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');

  [name, email, phone, subject, message].forEach(clearError);

  if (!name.value.trim() || name.value.trim().length < 2) {
    showError(name, 'Please enter your full name (at least 2 characters).'); valid = false;
  }
  if (!email.value.trim() || !isValidEmail(email.value)) {
    showError(email, 'Please enter a valid email address.'); valid = false;
  }
  if (phone.value.trim() && !isValidPhone(phone.value)) {
    showError(phone, 'Please enter a valid phone number.'); valid = false;
  }
  if (!subject.value) {
    showError(subject, 'Please select a subject.'); valid = false;
  }
  if (!message.value.trim() || message.value.trim().length < 10) {
    showError(message, 'Message must be at least 10 characters.'); valid = false;
  }

  if (valid) {
    const btn = form.querySelector('.btn-submit');
    btn.disabled = true; btn.textContent = 'Sending…';
    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '✉️ Send Message';
      document.getElementById('formSuccess').classList.add('show');
      setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 5000);
    }, 1400);
  }
});

// Live validation feedback
form?.querySelectorAll('input, textarea, select').forEach(input => {
  input.addEventListener('input', () => clearError(input));
});
