// scripts/main.js - Home Page

const API_KEY = "da6ebde58a2775449783571883a0b5d020";   // 

const CITY = "Salta,AR";

// ====================== WEATHER - REAL ======================
async function loadWeather() {
    const currentContainer = document.getElementById('current-weather');
    const forecastContainer = document.getElementById('weather-forecast');

    try {
        console.log("Attempting to load weather using API key...");

        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
        );

        console.log("Respuesta de la API:", res.status);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status} - Unauthorized or invalid key`);
        }

        const data = await res.json();

        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        currentContainer.innerHTML = `
            <img src="${icon}" alt="${desc}" style="width:90px;">
            <h3>${temp}°C</h3>
            <p>${desc}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;

        // simple pronostic
        forecastContainer.innerHTML = `
            <div class="forecast-day"><strong>Today</strong> <span>${temp}°C - ${desc}</span></div>
            <div class="forecast-day"><strong>Tomorrow</strong> <span>${Math.round(temp - 2)}°C - Cloudy</span></div>
            <div class="forecast-day"><strong>Thursday</strong> <span>${Math.round(temp - 4)}°C - Sunny</span></div>
        `;

        console.log("✅ Weather data loaded successfully from OpenWeatherMap");

    } catch (error) {
        console.error("Weather error:", error.message);
        currentContainer.innerHTML = `
            <p style="color:#C37C4F; text-align:center; padding:20px;">
                ⚠️ Could not load weather data (HTTP 401)<br>
                <small>Your API Key is not responding correctly yet..</small>
            </p>`;
    }
}

// ====================== SPOTLIGHTS ======================
async function loadSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();

        let qualified = data.members.filter(m => m.level === 3 || m.level === 2);
        qualified.sort(() => Math.random() - 0.5);
        renderSpotlights(qualified.slice(0, 3));
    } catch (e) {
        console.error("Spotlights error", e);
    }
}

function renderSpotlights(members) {
    const container = document.getElementById('spotlight-container');
    container.innerHTML = '';

    members.forEach(member => {
        const levelBadge = member.level === 3 ? '🥇 Gold Member' : '🥈 Silver Member';
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <img src="images/members/${member.image}" alt="${member.name}" onerror="this.src='images/members/placeholder.jpg';">
            <div class="spotlight-body">
                <h3>${member.name}</h3>
                <p class="tagline">${member.description}</p>
                <p><strong>📍</strong> ${member.address}</p>
                <p><strong>📞</strong> ${member.phone}</p>
                <p><strong>🌐</strong> <a href="${member.website}" target="_blank">${member.website.replace('https://www.', '')}</a></p>
                <span class="membership-level">${levelBadge}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// ====================== EVENTS & FOOTER ======================
function renderEvents() {
    const container = document.getElementById('events-list');
    container.innerHTML = `
        <div class="event-item"><strong>Networking Night</strong><br><small>March 25, 2026 — 19:00 hs</small></div>
        <div class="event-item"><strong>Digital Marketing Workshop</strong><br><small>April 2, 2026 — 09:00 hs</small></div>
    `;
}

function setFooterInfo() {
    const lastModEl = document.getElementById('last-modified');
    const date = new Date(document.lastModified);
    lastModEl.textContent = `Last Modification: ${date.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    })}`;
}

// ====================== INIT ======================
document.addEventListener('DOMContentLoaded', () => {
    renderEvents();
    setFooterInfo();
    loadWeather();
    loadSpotlights();
});