document.addEventListener('DOMContentLoaded', () => {
    // Fetch Configuration
    fetch('assets/data/config.json')
        .then(response => response.json())
        .then(config => {
            initializePage(config);
        })
        .catch(error => console.error('Error loading config:', error));
});

let conceptsData = [];
let releaseDate = 0;

function initializePage(config) {
    // 1. Set Static Content
    document.title = config.pageTitle;
    document.getElementById('brand').textContent = config.headerBrand;
    document.getElementById('page-title').textContent = config.headerTitle;
    document.getElementById('footer').innerHTML = config.footerText;

    // 2. Set Release Date
    releaseDate = new Date(config.releaseDate).getTime();
    startTimer();

    // 3. Generate Concept Cards
    conceptsData = config.concepts;
    const conceptGrid = document.getElementById('concept-grid');
    conceptGrid.innerHTML = ''; // Clear any existing content

    conceptsData.forEach((concept, index) => {
        const card = document.createElement('div');
        card.className = `concept-card ${index === 0 ? 'active' : ''}`;
        card.onclick = () => setConcept(index);
        // Set CSS variable for hover effect color
        card.style.setProperty('--card-color', concept.color);

        card.innerHTML = `
            <div class="concept-name">${concept.name}</div>
            <div class="concept-role">${concept.role}</div>
        `;
        conceptGrid.appendChild(card);
    });

    // Initialize first concept
    if (conceptsData.length > 0) {
        setConcept(0);
    }
}

// --- TIMER LOGIC ---
function startTimer() {
    function updateTimer() {
        const now = new Date().getTime();
        const distance = releaseDate - now;

        if (distance < 0) {
            const timerWrapper = document.querySelector(".timer-wrapper");
            if (timerWrapper) {
                 timerWrapper.innerHTML = "<h2 style='font-family:Syncopate; font-size:3rem;'>OUT NOW</h2>";
            }
            return;
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        const elDays = document.getElementById("days");
        const elHours = document.getElementById("hours");
        const elMinutes = document.getElementById("minutes");
        const elSeconds = document.getElementById("seconds");

        if (elDays) elDays.innerText = d < 10 ? "0" + d : d;
        if (elHours) elHours.innerText = h < 10 ? "0" + h : h;
        if (elMinutes) elMinutes.innerText = m < 10 ? "0" + m : m;
        if (elSeconds) elSeconds.innerText = s < 10 ? "0" + s : s;
    }

    setInterval(updateTimer, 1000);
    updateTimer(); // Initial call
}

// --- INTERACTIVE CONCEPT LOGIC ---
function setConcept(index) {
    if (!conceptsData || !conceptsData[index]) return;

    const data = conceptsData[index];
    const root = document.documentElement;
    const container = document.getElementById('teaser-container');
    const cards = document.querySelectorAll('.concept-card');

    // Update UI Colors
    root.style.setProperty('--accent-color', data.color);
    root.style.setProperty('--accent-glow', data.glow);

    // Update Active State on Cards
    cards.forEach(c => c.classList.remove('active'));
    if (cards[index]) {
        cards[index].classList.add('active');
    }

    // Update Text with Animation Reset
    // We use standard HTML injection to trigger the CSS animation again
    if (container) {
        container.innerHTML = `
            <div class="teaser-text">${data.text}</div>
            <div class="teaser-meta">${data.meta}</div>
        `;
    }
}
