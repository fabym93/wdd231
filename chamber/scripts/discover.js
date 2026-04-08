// scripts/discover.js - Discover Page

import { places } from '../data/discover.mjs';

console.log("🚀 discover.js loaded successfully");

// ====================== LAST VISIT MESSAGE ======================
function showLastVisitMessage() {
    const messageContainer = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!lastVisit) {
        messageContainer.innerHTML = `<p class="welcome-msg">Welcome! Let us know if you have any questions.</p>`;
    } else {
        const daysSince = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));

        if (daysSince < 1) {
            messageContainer.innerHTML = `<p class="welcome-msg">Back so soon! Awesome!</p>`;
        } else {
            const dayText = daysSince === 1 ? 'day' : 'days';
            messageContainer.innerHTML = `<p class="welcome-msg">You last visited ${daysSince} ${dayText} ago.</p>`;
        }
    }

    // Save current visit
    localStorage.setItem('lastVisit', now.toString());
}

// ====================== BUILD DISCOVER CARDS ======================
function buildDiscoverCards() {
    const grid = document.getElementById('discover-grid');
    grid.innerHTML = '';

    places.forEach(place => {
        const card = document.createElement('div');
        card.className = 'discover-card';
        card.style.gridArea = `card${place.id}`;

        card.innerHTML = `
            <figure>
                <img src="images/discover/${place.image}" 
                     alt="${place.name}" 
                     loading="lazy">
            </figure>
            <h3>${place.name}</h3>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button class="learn-more-btn">Learn More</button>
        `;

        grid.appendChild(card);
    });
}

// ====================== GRID TEMPLATE AREAS ======================
function setGridLayout() {
    const grid = document.getElementById('discover-grid');

    // Small screens (mobile) - stacked
    if (window.innerWidth < 641) {
        grid.style.gridTemplateAreas = `
            "card1" "card2" "card3" "card4" 
            "card5" "card6" "card7" "card8"
        `;
        grid.style.gridTemplateColumns = "1fr";
    }
    // Medium screens
    else if (window.innerWidth < 1025) {
        grid.style.gridTemplateAreas = `
            "card1 card2" 
            "card3 card4" 
            "card5 card6" 
            "card7 card8"
        `;
        grid.style.gridTemplateColumns = "1fr 1fr";
    }
    // Large screens
    else {
        grid.style.gridTemplateAreas = `
            "card1 card2 card3" 
            "card4 card5 card6" 
            "card7 card8 ."
        `;
        grid.style.gridTemplateColumns = "1fr 1fr 1fr";
    }
}

// ====================== HOVER EFFECT (Desktop only) ======================
function addHoverEffects() {
    const cards = document.querySelectorAll('.discover-card img');
    cards.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.08)';
            img.style.transition = 'transform 0.4s ease';
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

// ====================== INITIALIZE ======================
document.addEventListener('DOMContentLoaded', () => {
    buildDiscoverCards();
    setGridLayout();
    addHoverEffects();
    setLastModified();           // ← newline

    window.addEventListener('resize', setGridLayout);

    console.log("✅ Discover page initialized");
});

// ====================== LAST MODIFICATION DATE ======================
function setLastModified() {
    const lastModEl = document.getElementById('last-modified');
    if (lastModEl) {
        const date = new Date(document.lastModified);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        lastModEl.textContent = `Last Modification: ${date.toLocaleDateString('en-US', options)}`;
    }
}