// Custom confetti function
function fireCustomConfetti() {
    // First burst - Center
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FF69B4', '#FFB6C6', '#FFC0CB', '#ffffff'],
        ticks: 200
    });

    // Hearts
    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0.3,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['heart'],
        colors: ['#ff0000', '#ff69b4', '#ff8c69']
    };

    // Left side burst
    setTimeout(() => {
        confetti({
            ...defaults,
            particleCount: 30,
            origin: { x: 0, y: 0.8 }
        });
    }, 200);

    // Right side burst
    setTimeout(() => {
        confetti({
            ...defaults,
            particleCount: 30,
            origin: { x: 1, y: 0.8 }
        });
    }, 400);

    // Shower effect
    let end = Date.now() + (2 * 1000);
    let colors = ['#ff69b4', '#ff77ff', '#ff1493'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Load all audio files
const bellSound = new Audio('./bell-sound.mp3');
const celebrationSound = new Audio('./celebration-sound.mp3');
const popSound = new Audio('./pop-sound.mp3');

// Add your main content to the page
const mainContent = `
    <div class="main-content" id="mainContent">
        <div class="secret-message" id="welcome-message">
            <h1>Congratulations! 🎉</h1>
            <p class="main-text">You found the secret page!</p>
            <p class="sub-text">You're amazing! 💖</p>
            <button class="okay-btn" onclick="hideWelcomeMessage()">Okay! 💖</button>
        </div>
    </div>
    <div id="message-box" class="message-box"></div>
`;

window.addEventListener('load', function() {
    setTimeout(function() {
        // Hide loading screen with fade effect
        const loadingScreen = document.querySelector('.loading-screen');
        const mainContent = document.getElementById('mainContent');
        
        loadingScreen.style.transition = 'opacity 0.5s';
        loadingScreen.style.opacity = '0';
        
        // Make main content visible before the loading screen fully fades
        mainContent.style.display = 'flex';  // Changed from 'block'
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 0.5s';
        
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            mainContent.style.opacity = '1';
            // Fire confetti when content is shown
            fireCustomConfetti();
        }, 500);
    }, 2000);
});

function hideWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcome-message');
    const iconsContainer = document.querySelector('.icons-container');
    welcomeMessage.classList.add('fade-out');
    
    // Play celebration sound
    celebrationSound.play();
    
    // Remove welcome message and show icons after animation
    setTimeout(() => {
        welcomeMessage.style.display = 'none';
        iconsContainer.classList.add('show');
    }, 500);
}

// Handle icon clicks
document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('click', function() {
        showMessage(this.dataset.message);
    });
});

// Show message function
function showMessage(text) {
    // Play pop sound
    popSound.play();

    // Show message
    const messageBox = document.getElementById('message-box');
    messageBox.innerHTML = text;
    messageBox.style.display = 'block';

    // Hide message after 3 seconds
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
}

// Close message when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.icon') && !e.target.closest('.message-box')) {
        document.getElementById('message-box').style.display = 'none';
    }
});

// Add after your existing JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // GSAP Animations
    const tl = gsap.timeline();

    // Animate header and nav
    tl.from('.retro-header h1', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "bounce.out"
    })
    .from('.nav-item', {
        duration: 0.5,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: "power2.out"
    });

    // Anime.js animations for info items with smoother transition
    anime({
        targets: '.info-item',
        translateX: [-20, 0], // Reduced movement
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: 'easeOutExpo'
    });

    // Status items animation (removed rotation)
    anime({
        targets: '.status-item',
        scale: [0.9, 1], // Reduced scale effect
        opacity: [0, 1],
        delay: anime.stagger(200),
        easing: 'easeOutSine'
    });

    // Gentle floating animation for box titles
    anime({
        targets: '.box-title',
        translateY: [-2, 2], // Reduced movement
        duration: 2000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });

    // Typing effect for secret message
    const typingTexts = document.querySelectorAll('.typing-text');
    typingTexts.forEach((text, index) => {
        const content = text.textContent;
        text.textContent = '';
        let i = 0;
        
        setTimeout(() => {
            const typing = setInterval(() => {
                if (i < content.length) {
                    text.textContent += content.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 50);
        }, index * 1000);
    });

    // Smooth hover effects for links
    document.querySelectorAll('.link-item').forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link,
                translateX: 5, // Reduced movement
                color: '#ff69b4',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        link.addEventListener('mouseleave', () => {
            anime({
                targets: link,
                translateX: 0,
                color: '#888',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Subtle glitch effect for title
    const glitchText = document.querySelector('.glitch-text');
    setInterval(() => {
        glitchText.style.textShadow = `
            ${Math.random() * 5}px ${Math.random() * 5}px #ff0000,
            ${Math.random() * -5}px ${Math.random() * 5}px #00ff00,
            ${Math.random() * 5}px ${Math.random() * -5}px #0000ff
        `;
        setTimeout(() => {
            glitchText.style.textShadow = 'none';
        }, 50);
    }, 3000);

    // Smooth fade-in for grid items
    anime({
        targets: '.grid-item',
        translateY: [20, 0], // Reduced movement
        opacity: [0, 1],
        delay: anime.stagger(100, {start: 500}),
        easing: 'easeOutSine'
    });

    // Initialize quick links
    const quickLinks = [
        {text: "→ our memories", url: "#"},
        {text: "→ photo gallery", url: "#"},
        {text: "→ love letters", url: "#"},
        {text: "→ special moments", url: "#"},
        {text: "→ future plans", url: "#"},
        {text: "→ inside jokes", url: "#"}
    ];

    const linksBox = document.querySelector('.links-box');
    quickLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.className = 'link-item';
        a.textContent = link.text;
        linksBox.appendChild(a);
    });
});

// Add a cool effect when clicking anywhere in the document
document.addEventListener('click', (e) => {
    // Create a ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.background = '#0066ff';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    document.body.appendChild(ripple);

    // Animate the ripple
    gsap.to(ripple, {
        scale: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => ripple.remove()
    });
}); 