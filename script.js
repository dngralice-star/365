// Data for Page 1 No Button States
const noButtonMessages = [
    "Are you absolutely sure? 🥺",
    "Think again... I already invested 365 days 😂❤️",
    "Please don't break my tiny heart 😭",
    "Fine I will do it my way 😉..."
];

// Data for Page 3 Cards
const cardMessages = [
    "🎁 Lavi is granted 5 wishes and Aashi cannot decline ",
    "📸 Aashi will have to suggest next 3 songs for my story.",
    "🎵Lavi will recieve 3 exclusive songs that are and will not be posted anywhere.",
    "🎥 Lavi gets to choose the next movie.",
    "🍦Lavi wins one ice cream sponsored by Aashi." ,
    "Aashi can reject 2 wishes if she doesn't like it",
    "🍫 Lavi owes Aashi her favorite chocolate",
    "🎧 Lavi must create a playlist that reminds him of Aashi.",
    "🌷 Lavi has to write Aashi a handwritten letter someday.",
    "🔄 Reshuffle Allowed.",
    "TBD at the moment",
    "Lavi is granted one these choices of his liking(developer perks yk!)"
];

// Elements
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const questionText = document.getElementById('question-text');
const btnNext = document.getElementById('btn-next');
const page1 = document.getElementById('page-1');
const page2 = document.getElementById('page-2');
const page3 = document.getElementById('page-3');
const page4 = document.getElementById('page-4');
const cardsGrid = document.getElementById('cards-grid');
const bgContainer = document.getElementById('bg-container');
const btnShuffle = document.getElementById('btn-shuffle');
const btnToReview = document.getElementById('btn-to-review');

// Audio Toggle
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isMusicPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>';
    } else {
        bgMusic.play().catch(e => console.log("Audio play blocked by browser:", e));
        musicToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'; // Pause icon
    }
    isMusicPlaying = !isMusicPlaying;
});

// Create Floating Hearts
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 5 + 's'; // 5-8 seconds
        heart.style.fontSize = Math.random() * 10 + 15 + 'px'; // 15-25px
        
        bgContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 600);
}

// Page 1 Logic
let noClickCount = 0;
let runawayMode = false;

function handleNoClick() {
    if (noClickCount < noButtonMessages.length) {
        questionText.textContent = noButtonMessages[noClickCount];
        noClickCount++;
        
        // Make the YES button bigger slightly
        let currentSize = parseFloat(window.getComputedStyle(btnYes).fontSize);
        btnYes.style.fontSize = (currentSize * 1.1) + 'px';
        let currentPad = parseFloat(window.getComputedStyle(btnYes).paddingTop);
        btnYes.style.padding = `${currentPad * 1.1}px ${currentPad * 2.5 * 1.1}px`;

    } else {
        // Runaway mode activated!
        runawayMode = true;
        btnNo.style.position = 'fixed';
        btnNo.style.zIndex = '9999';
        document.body.appendChild(btnNo); // Escape the card's overflow:hidden
        btnNo.style.transition = 'top 0.3s ease, left 0.3s ease';
        moveButton();
    }
}

function moveButton() {
    if (!runawayMode) return;
    
    // Calculate new position ensuring it stays within window bounds
    const maxX = window.innerWidth - btnNo.offsetWidth;
    const maxY = window.innerHeight - btnNo.offsetHeight;
    
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
}

btnNo.addEventListener('click', (e) => {
    if (!runawayMode) {
        handleNoClick();
    } else {
        // Prevent click if somehow caught on mobile
        e.preventDefault();
        moveButton();
    }
});

btnNo.addEventListener('mouseover', () => {
    if (runawayMode) {
        moveButton();
    }
});

// Mobile specific runaway
btnNo.addEventListener('touchstart', (e) => {
    if (runawayMode) {
        e.preventDefault();
        moveButton();
    }
});

// Yes Button -> Page 2
btnYes.addEventListener('click', () => {
    btnNo.style.display = 'none';
    page1.classList.remove('active');
    page1.classList.add('hidden');
    
    setTimeout(() => {
        page2.classList.remove('hidden');
        page2.classList.add('active');
        fireConfetti();
    }, 800); // Wait for fade out
});

// Confetti Effect
function fireConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, { particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);
}

// Next Button -> Page 3
btnNext.addEventListener('click', () => {
    page2.classList.remove('active');
    page2.classList.add('hidden');
    
    setTimeout(() => {
        page3.classList.remove('hidden');
        page3.classList.add('active');
        initializeCards();
    }, 800);
});

// Page 3: Cards Logic
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initializeCards() {
    // Clear existing cards if any
    cardsGrid.innerHTML = '';
    
    // Do not shuffle the text initially so they can be read.
    const messages = [...cardMessages];
    
    messages.forEach((msg) => {
        const card = document.createElement('div');
        // Add 'flipped' by default so they start open
        card.classList.add('t-card', 'flipped');
        
        card.innerHTML = `
            <div class="t-card-inner">
                <div class="t-card-front">
                    ?
                </div>
                <div class="t-card-back">
                    ${msg}
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            // Toggle flip state so they can be turned over manually if desired
            card.classList.toggle('flipped');
        });
        
        cardsGrid.appendChild(card);
    });
}

// Add Shuffle Button Logic
if (btnShuffle) {
    btnShuffle.addEventListener('click', () => {
        // 1. Hide all cards by removing the 'flipped' class
        const allCards = document.querySelectorAll('.t-card');
        allCards.forEach(card => card.classList.remove('flipped'));
        
        // 2. Wait for flip animation (0.6s), then shuffle their order in the DOM
        setTimeout(() => {
            const cardsArray = Array.from(allCards);
            shuffleArray(cardsArray);
            
            // Re-append in shuffled order
            cardsGrid.innerHTML = '';
            cardsArray.forEach(card => {
                cardsGrid.appendChild(card);
            });
        }, 600);
    });
}

// Next Button -> Page 4 (Review)
if (btnToReview) {
    btnToReview.addEventListener('click', () => {
        page3.classList.remove('active');
        page3.classList.add('hidden');
        
        setTimeout(() => {
            page4.classList.remove('hidden');
            page4.classList.add('active');
        }, 800);
    });
}

// Review Table Interactive Stars
function initializeReviewTable() {
    const starCells = document.querySelectorAll('.review-table tbody td:nth-child(2)');
    
    starCells.forEach(cell => {
        const text = cell.textContent.trim();
        let starCount = 5;
        let filledCount = 0; // Start with all stars empty
        let suffix = text.replace(/[⭐☆]/g, '').trim();
        
        cell.innerHTML = ''; // Clear cell
        
        for (let i = 1; i <= starCount; i++) {
            const starSpan = document.createElement('span');
            starSpan.classList.add('star');
            starSpan.dataset.value = i;
            starSpan.textContent = i <= filledCount ? '⭐' : '☆';
            
            starSpan.addEventListener('click', () => {
                updateRowStars(cell, i);
                calculateOverall();
            });
            
            cell.appendChild(starSpan);
        }
        
        if (suffix) {
            const suffixSpan = document.createElement('span');
            suffixSpan.textContent = ' ' + suffix;
            cell.appendChild(suffixSpan);
        }
    });
    
    calculateOverall();
}

function updateRowStars(container, value) {
    const stars = container.querySelectorAll('.star');
    stars.forEach(star => {
        const starVal = parseInt(star.dataset.value);
        if (starVal <= value) {
            star.textContent = '⭐';
        } else {
            star.textContent = '☆';
        }
    });
}

function calculateOverall() {
    let totalFilled = 0;
    let totalStars = 0;
    
    const allStars = document.querySelectorAll('.review-table tbody .star');
    allStars.forEach(star => {
        if (star.textContent === '⭐') {
            totalFilled++;
        }
        totalStars++;
    });
    
    if (totalStars === 0) return;
    
    let overallScore = ((totalFilled / totalStars) * 10).toFixed(1);
    if (overallScore.endsWith('.0')) {
        overallScore = overallScore.slice(0, -2);
    }
    
    const overallCell = document.querySelector('.review-table tfoot td:nth-child(2)');
    if (overallCell) {
        overallCell.textContent = `${overallScore}/10`;
    }
}

// Initialize
createFloatingHearts();
initializeReviewTable();

