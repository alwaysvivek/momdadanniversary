// Heart Button Interaction
const heartBtn = document.getElementById('heartBtn');
const heartMessage = document.getElementById('heartMessage');
const celebration = document.getElementById('celebration');
const floatingHeartsContainer = document.getElementById('floatingHearts');

const messages = [
    "20 Years of Love! 💕",
    "Together Forever! 💑",
    "Happy Anniversary! 🎉",
    "Celebrating Your Love! ❤️",
    "Two Decades Strong! 💪",
    "Love Never Fades! ✨",
    "Perfect Together! 🌹",
    "Beautiful Journey! 🌈",
    "Love Wins Always! 💖",
    "Blessed with Love! 🙏"
];

let clickCount = 0;

heartBtn.addEventListener('click', function() {
    // Show random message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    heartMessage.textContent = randomMessage;
    
    // Show celebration effect
    celebration.textContent = '🎉✨🎊';
    celebration.classList.remove('hidden');
    
    setTimeout(() => {
        celebration.classList.add('hidden');
    }, 1000);
    
    // Create floating hearts
    createFloatingHearts();
    
    // Increment click count and show special message
    clickCount++;
    if (clickCount === 20) {
        heartMessage.textContent = "🎊 20 clicks for 20 years! Perfect! 🎊";
        createConfetti();
    }
});

// Create floating hearts
function createFloatingHearts() {
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💞'];
    const numberOfHearts = 5;
    
    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 0.5 + 's';
        
        floatingHeartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
}

// Create confetti effect
function createConfetti() {
    const confettiSymbols = ['🎉', '🎊', '✨', '⭐', '🌟', '💫'];
    const numberOfConfetti = 30;
    
    for (let i = 0; i < numberOfConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'floating-heart';
        confetti.textContent = confettiSymbols[Math.floor(Math.random() * confettiSymbols.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.fontSize = (Math.random() * 2 + 1) + 'em';
        
        floatingHeartsContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
}

// Music Player
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
const musicText = document.getElementById('musicText');
const celebrationMusic = document.getElementById('celebrationMusic');

let isPlaying = false;

musicBtn.addEventListener('click', function() {
    if (isPlaying) {
        celebrationMusic.pause();
        musicIcon.textContent = '🔊';
        musicText.textContent = 'Play Celebration Music';
        isPlaying = false;
    } else {
        // If no audio file is present, show a friendly message
        if (!celebrationMusic.src || celebrationMusic.error) {
            musicText.textContent = '🎵 Add celebration.mp3 to play music';
            setTimeout(() => {
                musicText.textContent = 'Play Celebration Music';
            }, 3000);
            return;
        }
        
        celebrationMusic.play().then(() => {
            musicIcon.textContent = '🔇';
            musicText.textContent = 'Pause Music';
            isPlaying = true;
        }).catch(err => {
            console.log('Audio play failed:', err);
            musicText.textContent = '🎵 Add celebration.mp3 to play music';
            setTimeout(() => {
                musicText.textContent = 'Play Celebration Music';
            }, 3000);
        });
    }
});

// Auto-play celebration animation on page load
window.addEventListener('load', function() {
    // Create initial floating hearts after a delay
    setTimeout(() => {
        createFloatingHearts();
    }, 2000);
    
    // Create periodic floating hearts
    setInterval(() => {
        if (Math.random() > 0.7) {
            createFloatingHearts();
        }
    }, 5000);
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Photo gallery hover effect enhancement
const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
photoPlaceholders.forEach(placeholder => {
    placeholder.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    placeholder.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Wish items animation
const wishItems = document.querySelectorAll('.wish-item');
wishItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Special Easter egg - konami code style
let konamiCode = [];
const konamiSequence = ['2', '0'];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiSequence[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiSequence.length) {
            konamiIndex = 0;
            heartMessage.textContent = "🎊 Secret Found! 20 years of magic! 🎊";
            createConfetti();
        }
    } else {
        konamiIndex = 0;
    }
});

// Add sparkle effect on page
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '1.5em';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkleAnimation 1s ease-out';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnimation {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Add click sparkle effect
let lastSparkleTime = 0;
document.addEventListener('click', function(e) {
    const now = Date.now();
    if (now - lastSparkleTime > 300) { // Throttle sparkles
        createSparkle(e.clientX, e.clientY);
        lastSparkleTime = now;
    }
});

// Console message for the developer
console.log('%c💖 Happy 20th Anniversary! 💖', 'color: #e91e63; font-size: 24px; font-weight: bold;');
console.log('%c🎉 Made with love for Mom & Dad 🎉', 'color: #9c27b0; font-size: 16px;');
console.log('%cPress 2 and 0 on your keyboard for a surprise! ✨', 'color: #667eea; font-size: 14px;');
