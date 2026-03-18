// scripts/directory.js

// Element selectors
const membersContainer = document.getElementById('members-container');
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

// ====================== LOAD MEMBERS FROM JSON ======================
async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Failed to load JSON file');

        const data = await response.json();
        renderMembers(data.members);
    } catch (error) {
        console.error('Error loading members:', error);
        membersContainer.innerHTML = `
            <p style="grid-column: 1/-1; text-align:center; color:#C37C4F; padding: 3rem;">
                ⚠️ Could not load members. Please check that data/members.json exists.
            </p>`;
    }
}

// Render member cards
function renderMembers(members) {
    membersContainer.innerHTML = '';

    members.forEach(member => {
        const levelBadge = member.level === 3 ? '🥇 Gold' :
            member.level === 2 ? '🥈 Silver' : '🥉 Member';

        const card = document.createElement('div');
        card.className = 'member-card';

        card.innerHTML = `
            <img src="images/members/${member.image}" 
                 alt="${member.name}"
                 onerror="this.src='images/members/placeholder.jpg';">
            
            <div class="card-body">
                <h3>${member.name}</h3>
                <p class="tagline">${member.description}</p>
                <p><strong>📍</strong> ${member.address}</p>
                <p><strong>📞</strong> ${member.phone}</p>
                <p><strong>🌐</strong> 
                    <a href="${member.website}" target="_blank" rel="noopener">
                        ${member.website.replace('https://www.', '')}
                    </a>
                </p>
                <span class="membership-level">${levelBadge}</span>
            </div>
        `;

        membersContainer.appendChild(card);
    });
}

// ====================== TOGGLE BETWEEN GRID AND LIST VIEW ======================
function setView(view) {
    if (view === 'grid') {
        membersContainer.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    } else {
        membersContainer.classList.add('list-view');
        gridBtn.classList.remove('active');
        listBtn.classList.add('active');
    }
}

// ====================== EVENTS, CURRENT WEATHER & FORECAST ======================
const eventsData = [
    { title: "Networking Night", date: "March 25, 2026", time: "19:00 hs" },
    { title: "Business Workshop: Digital Marketing", date: "April 2, 2026", time: "09:00 hs" },
    { title: "Salta Export Fair", date: "April 15, 2026", time: "10:00 hs" }
];

const currentWeatherData = {
    temp: "24°C",
    condition: "Partly Cloudy",
    high: "28°C",
    low: "16°C",
    humidity: "45%",
    icon: "⛅"
};

const forecastData = [
    { day: "Today", temp: "27°C", condition: "Sunny" },
    { day: "Tomorrow", temp: "25°C", condition: "Cloudy" },
    { day: "Thursday", temp: "22°C", condition: "Rain" }
];

function renderEvents() {
    const container = document.getElementById('events-list');
    container.innerHTML = eventsData.map(event => `
        <div class="event-item">
            <strong>${event.title}</strong><br>
            <small>${event.date} - ${event.time}</small>
        </div>
    `).join('');
}

function renderCurrentWeather() {
    const container = document.getElementById('current-weather');
    container.innerHTML = `
        <div style="font-size: 4.5rem; margin-bottom: 10px;">${currentWeatherData.icon}</div>
        <h3 style="font-size: 2.8rem; margin: 0;">${currentWeatherData.temp}</h3>
        <p style="font-size: 1.2rem;">${currentWeatherData.condition}</p>
        <div class="weather-info" style="margin-top: 15px; font-size: 1rem;">
            <p><strong>High:</strong> ${currentWeatherData.high} | <strong>Low:</strong> ${currentWeatherData.low}</p>
            <p><strong>Humidity:</strong> ${currentWeatherData.humidity}</p>
        </div>
    `;
}

function renderForecast() {
    const container = document.getElementById('weather-forecast');
    container.innerHTML = forecastData.map(day => `
        <div class="forecast-day">
            <span><strong>${day.day}</strong></span>
            <span>${day.temp} — ${day.condition}</span>
        </div>
    `).join('');
}

// ====================== FOOTER INFORMATION ======================
function setFooterInfo() {
    const lastModEl = document.getElementById('last-modified');
    const date = new Date(document.lastModified);

    lastModEl.textContent = `Last Modification: ${date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}`;

    const yearEl = document.querySelector('.development-info p:last-child');
    if (yearEl) {
        yearEl.textContent = `© ${new Date().getFullYear()} Salta Chamber of Commerce`;
    }
}

// ====================== EVENT LISTENERS ======================
gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));

// ====================== INITIALIZE WHEN PAGE LOADS ======================
document.addEventListener('DOMContentLoaded', () => {
    loadMembers();
    setFooterInfo();
    renderEvents();
    renderCurrentWeather();
    renderForecast();
});