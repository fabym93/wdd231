// scripts/join.js - Join Page

document.addEventListener('DOMContentLoaded', () => {

    // ==================== AUTOMATIC TIMESTAMP ====================
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toLocaleString('en-US', {
            timeZone: 'America/Argentina/Salta',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    // ==================== MEMBERSHIP LEVEL MODALS ====================
    const levelLinks = document.querySelectorAll('.level-link');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2 id="modal-title"></h2>
            <div id="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.close-modal');

    const membershipInfo = {
        np: {
            title: "NP Membership - Non-Profit",
            body: `<p><strong>Cost:</strong> Free</p><p>For non-profit organizations.</p><ul><li>Access to general events</li><li>Basic directory listing</li><li>Community workshops</li></ul>`
        },
        bronze: {
            title: "Bronze Membership",
            body: `<p><strong>Benefits:</strong></p><ul><li>Directory listing</li><li>Monthly events access</li><li>10% discount on training</li><li>Newsletter subscription</li></ul>`
        },
        silver: {
            title: "Silver Membership",
            body: `<p><strong>Benefits:</strong></p><ul><li>Priority event access</li><li>25% discount on training</li><li>Featured listing</li><li>Business networking sessions</li></ul>`
        },
        gold: {
            title: "Gold Membership",
            body: `<p><strong>Premium Benefits:</strong></p><ul><li>Homepage logo placement</li><li>VIP event access</li><li>40% discount on all services</li><li>Exclusive meetings with leaders</li><li>Personalized support</li></ul>`
        }
    };

    levelLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const level = link.parentElement.getAttribute('data-level');
            if (membershipInfo[level]) {
                modalTitle.textContent = membershipInfo[level].title;
                modalBody.innerHTML = membershipInfo[level].body;
                modal.style.display = 'flex';
            }
        });
    });

    closeModalBtn.addEventListener('click', () => modal.style.display = 'none');

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // ==================== INITIAL ANIMATION FOR MEMBERSHIP CARDS ====================
    function animateCards() {
        const cards = document.querySelectorAll('.level-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            setTimeout(() => {
                card.style.transition = 'all 0.7s ease';
                card.style.transitionDelay = `${index * 150}ms`;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 400);
        });
    }

    setTimeout(animateCards, 600);

    // ==================== FORM SUBMISSION - PASS DATA TO THANK YOU PAGE ====================
    const form = document.getElementById('membership-form');
    if (form) {
        form.addEventListener('submit', function () {
            console.log("✅ Form submitted successfully - Data being passed to thankyou.html");
            // No preventDefault() needed - form will submit to thankyou.html via GET
        });
    }

    console.log("✅ join.js loaded successfully");


    // ==================== FOOTER LAST MODIFIED ====================
    function setFooterInfo() {
        const lastModEl = document.getElementById('last-modified');
        if (lastModEl) {
            const date = new Date(document.lastModified);
            lastModEl.textContent = `Last Modification: ${date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}`;
        }
    }

    // call function
    setFooterInfo();
});