// script.js - Versión final para todas las páginas

// ==================== HAMBURGER MENU ====================
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

// ==================== MODAL (just for programs.html) ====================
let currentActivity = null;

function openModal(activity) {
    currentActivity = activity;

    document.getElementById('modal-title').textContent = activity.title;
    document.getElementById('modal-age').textContent = activity.ageGroup;
    document.getElementById('modal-category').textContent = activity.category;
    document.getElementById('modal-duration').textContent = activity.duration;
    document.getElementById('modal-desc').textContent = activity.description;

    // local image assignment
    let imageUrl = "images/sensory.jpg";

    switch (activity.category) {
        case "Art": imageUrl = "images/art.jpg"; break;
        case "Music": imageUrl = "images/music.jpg"; break;
        case "Sensory": imageUrl = "images/sensory.jpg"; break;
        case "Physical": imageUrl = "images/physical.jpg"; break;
        case "Language": imageUrl = "images/language.jpg"; break;
        case "Cognitive": imageUrl = "images/cognitive.jpg"; break;
        case "Science": imageUrl = "images/science.jpg"; break;
        case "Social": imageUrl = "images/social.jpg"; break;
        case "Life Skills": imageUrl = "images/life-skills.jpg"; break;
    }

    const modalImage = document.getElementById('modal-image');
    if (modalImage) {
        modalImage.src = imageUrl;
        modalImage.alt = activity.title;
    }

    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'none';
}

function saveToFavorites() {
    if (!currentActivity) return;

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.find(f => f.id === currentActivity.id)) {
        favorites.push(currentActivity);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${currentActivity.title} added to favorites!`);
    } else {
        alert('Already in favorites!');
    }
    closeModal();
}

// ==================== LOAD ACTIVITIES (just for programs.html) ====================
async function loadActivities() {
    const container = document.getElementById('activity-grid');
    if (!container) return;

    try {
        const response = await fetch('data/activities.json');
        if (!response.ok) throw new Error('Failed to load data');

        const activities = await response.json();

        const html = activities.map(activity => {
            let imageUrl = "images/sensory.jpg";

            switch (activity.category) {
                case "Art": imageUrl = "images/art.jpg"; break;
                case "Music": imageUrl = "images/music.jpg"; break;
                case "Sensory": imageUrl = "images/sensory.jpg"; break;
                case "Physical": imageUrl = "images/physical.jpg"; break;
                case "Language": imageUrl = "images/language.jpg"; break;
                case "Cognitive": imageUrl = "images/cognitive.jpg"; break;
                case "Science": imageUrl = "images/science.jpg"; break;
                case "Social": imageUrl = "images/social.jpg"; break;
                case "Life Skills": imageUrl = "images/life-skills.jpg"; break;
            }

            return `
                <div class="activity-card" onclick="openModal(${JSON.stringify(activity)})">
                    <img src="${imageUrl}" 
                         alt="${activity.title}"
                         loading="lazy"
                         width="400" 
                         height="250">
                    <div class="card-content">
                        <h3>${activity.title}</h3>
                        <p><strong>Age:</strong> ${activity.ageGroup}</p>
                        <p><strong>Category:</strong> ${activity.category}</p>
                        <p>${activity.description.substring(0, 95)}...</p>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;

    } catch (error) {
        console.error('Error loading activities:', error);
        const container = document.getElementById('activity-grid');
        if (container) {
            container.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:red;padding:3rem;">
                Could not load activities. Please try again later.
            </p>`;
        }
    }
}

// ==================== INITIALIZE - run in all pages ====================
document.addEventListener('DOMContentLoaded', () => {

    // load activities if just container exists (programs.html)
    if (document.getElementById('activity-grid')) {
        loadActivities();
    }

    // Hamburger Menu - in all pages
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Modal handlers (just if exists on the page)
    const closeBtn = document.getElementById('close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    const saveBtn = document.getElementById('save-favorites');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveToFavorites);
    }
});