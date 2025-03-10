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

    // Game button functionality
    const gameButton = document.getElementById('launchGame');
    if (gameButton) {
        gameButton.addEventListener('click', () => {
            // Play pop sound
            popSound.play();
            
            // Launch game in new window
            window.open('your-game-url.html', '_blank', 'width=500,height=600');
            
            // Add some confetti
            fireCustomConfetti();
        });
    }
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

// Window Management System
const windowManager = {
    activeWindows: new Set(),
    zIndex: 1000,

    createWindow(type) {
        const template = document.querySelector('#window-template');
        const window = template.content.cloneNode(true).querySelector('.window');
        
        window.dataset.windowId = type;
        window.querySelector('.window-title').textContent = type.charAt(0).toUpperCase() + type.slice(1);
        
        // Set initial position
        window.style.left = '100px';
        window.style.top = '100px';
        window.style.zIndex = ++this.zIndex;

        const content = window.querySelector('.window-content');
        this.loadContent(type, content);

        document.getElementById('windows-container').appendChild(window);
        this.activeWindows.add(type);
        this.updateTaskbar();

        // Initialize jQuery UI draggable
        $(window).draggable({
            handle: '.window-titlebar',
            start: function() {
                $(this).css('z-index', ++windowManager.zIndex);
            }
        }).resizable();
        
        return window;
    },

    loadContent(type, container) {
        switch(type) {
            case 'memories':
                container.innerHTML = `
                    <div class="memories-grid">
                        <div class="memory-item">
                            <img src="assets/memories/memory1.jpg" alt="Memory 1">
                            <p>Our first date ❤️</p>
                        </div>
                    </div>
                `;
                break;

            case 'letters':
                container.innerHTML = `
                    <div class="letter-content">
                        <h3>Dear Priyanshi,</h3>
                        <p>This is a love letter just for you...</p>
                        <button class="add-letter-btn">
                            <span>✏️</span>
                            <span>New Letter</span>
                        </button>
                    </div>
                `;
                
                // Add letter button functionality
                const addLetterBtn = container.querySelector('.add-letter-btn');
                addLetterBtn.addEventListener('click', () => {
                    const newLetter = document.createElement('div');
                    newLetter.className = 'letter-content';
                    newLetter.innerHTML = `
                        <textarea placeholder="Write your letter here..."
                                  style="width: 100%; height: 200px; 
                                         background: #3c3c3c; color: white; 
                                         border: 1px solid #4c4c4c; 
                                         padding: 10px; border-radius: 4px;">
                        </textarea>
                    `;
                    container.appendChild(newLetter);
                });
                break;

            case 'photos':
                container.innerHTML = `
                    <div class="photo-gallery">
                        <div class="upload-section">
                            <input type="file" accept="image/*" multiple id="photoUpload">
                            <label for="photoUpload">📸 Add Photos</label>
                        </div>
                        <div class="photo-grid">
                            <!-- Photos will be added here -->
                        </div>
                    </div>
                `;
                
                // Handle photo uploads
                const photoUpload = container.querySelector('#photoUpload');
                photoUpload.addEventListener('change', (e) => {
                    const files = e.target.files;
                    const photoGrid = container.querySelector('.photo-grid');
                    
                    for (let file of files) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const photoItem = document.createElement('div');
                            photoItem.className = 'photo-item';
                            photoItem.innerHTML = `
                                <img src="${e.target.result}" alt="Uploaded photo">
                            `;
                            photoGrid.appendChild(photoItem);
                        };
                        reader.readAsDataURL(file);
                    }
                });
                break;

            case 'videos':
                container.innerHTML = `
                    <div class="video-list">
                        <div class="upload-section">
                            <input type="file" accept="video/*" multiple id="videoUpload">
                            <label for="videoUpload">🎥 Add Videos</label>
                        </div>
                        <div class="video-grid">
                            <!-- Videos will be added here -->
                        </div>
                    </div>
                `;
                
                // Handle video uploads
                const videoUpload = container.querySelector('#videoUpload');
                videoUpload.addEventListener('change', (e) => {
                    const files = e.target.files;
                    const videoGrid = container.querySelector('.video-grid');
                    
                    for (let file of files) {
                        const videoItem = document.createElement('div');
                        videoItem.className = 'video-item';
                        videoItem.innerHTML = `
                            <video controls>
                                <source src="${URL.createObjectURL(file)}" type="${file.type}">
                            </video>
                        `;
                        videoGrid.appendChild(videoItem);
                    }
                });
                break;
        }
    },

    updateTaskbar() {
        const taskbarItems = document.querySelector('.taskbar-items');
        taskbarItems.innerHTML = '';
        
        this.activeWindows.forEach(windowId => {
            const button = document.createElement('button');
            button.textContent = windowId;
            button.onclick = () => this.toggleWindow(windowId);
            taskbarItems.appendChild(button);
        });
    },

    toggleWindow(windowId) {
        const window = document.querySelector(`.window[data-window-id="${windowId}"]`);
        if (window.classList.contains('minimized')) {
            window.classList.remove('minimized');
        } else {
            window.classList.add('minimized');
        }
    }
};

// Desktop Icons Click Handler
document.querySelectorAll('.desktop-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const windowType = icon.dataset.window;
        windowManager.createWindow(windowType);
    });
});

// Window Controls
document.addEventListener('click', (e) => {
    if (e.target.matches('.window-controls .close')) {
        const window = e.target.closest('.window');
        const windowId = window.dataset.windowId;
        windowManager.activeWindows.delete(windowId);
        window.remove();
        windowManager.updateTaskbar();
    } else if (e.target.matches('.window-controls .minimize')) {
        const window = e.target.closest('.window');
        window.classList.add('minimized');
    } else if (e.target.matches('.window-controls .maximize')) {
        const window = e.target.closest('.window');
        window.classList.toggle('maximized');
    }
});

// Clock Update
function updateClock() {
    const clock = document.querySelector('.clock');
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock(); 