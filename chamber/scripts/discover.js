// scripts/discover.js - Discover Page 

import { places } from '../data/discover.mjs';

console.log("🚀 discover.js loaded successfully");

// ====================== LAST VISIT MESSAGE ======================
function showLastVisitMessage() {
    const messageContainer = document.getElementById('visit-message');
    if (!messageContainer) {
        console.warn("⚠️ #visit-message element not found in HTML");
        return;
    }

    const lastVisit = localStorage.getItem('lastVisitDiscover');
    const now = Date.now();

    let messageHTML = '';

    if (!lastVisit) {
        messageHTML = `<p class="welcome-msg">Welcome! Let us know if you have any questions.</p>`;
    } else {
        const daysSince = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));

        if (daysSince < 1) {
            messageHTML = `<p class="welcome-msg">Back so soon! Awesome!</p>`;
        } else {
            const dayText = daysSince === 1 ? 'day' : 'days';
            messageHTML = `<p class="welcome-msg">You last visited ${daysSince} ${dayText} ago.</p>`;
        }
    }

    messageContainer.innerHTML = messageHTML;

    // Save current visit
    localStorage.setItem('lastVisitDiscover', now.toString());
}

// ====================== BUILD CARDS ======================
function buildDiscoverCards() {
    const grid = document.getElementById('discover-grid');
    if (!grid) return;

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

// ====================== GRID LAYOUT ======================
function setGridLayout() {
    const grid = document.getElementById('discover-grid');
    if (!grid) return;

    if (window.innerWidth < 641) {
        grid.style.gridTemplateColumns = "1fr";
        grid.style.gridTemplateAreas = `
            "card1" "card2" "card3" "card4" 
            "card5" "card6" "card7" "card8"
        `;
    }
    else if (window.innerWidth < 1025) {
        grid.style.gridTemplateColumns = "1fr 1fr";
        grid.style.gridTemplateAreas = `
            "card1 card2" 
            "card3 card4" 
            "card5 card6" 
            "card7 card8"
        `;
    }
    else {
        grid.style.gridTemplateColumns = "1fr 1fr 1fr";
        grid.style.gridTemplateAreas = `
            "card1 card2 card3" 
            "card4 card5 card6" 
            "card7 card8 ."
        `;
    }
}

// ====================== HOVER EFFECTS ======================
function addHoverEffects() {
    const images = document.querySelectorAll('.discover-card img');
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.08)';
            img.style.transition = 'transform 0.4s ease';
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

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

// ====================== INITIALIZE ======================
document.addEventListener('DOMContentLoaded', () => {
    showLastVisitMessage();   // ← Ahora sí se llama
    buildDiscoverCards();
    setGridLayout();
    addHoverEffects();
    setLastModified();        // ← Last Modification

    window.addEventListener('resize', setGridLayout);

    console.log("✅ Discover page fully initialized with Last Visit Message");
});