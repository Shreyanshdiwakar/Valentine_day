document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('backgroundMusic');
    const musicBtn = document.getElementById('musicButton');
    let isPlaying = false;
    
    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            music.pause();
            musicBtn.textContent = '🎵 Play Music';
        } else {
            music.play();
            musicBtn.textContent = '🎵 Pause Music';
        }
        isPlaying = !isPlaying;
    });

    const yesBtn = document.querySelector('.yes-btn');
    const noBtn = document.querySelector('.no-btn');
    const valentineContainer = document.querySelector('.valentine-container');
    const card = document.querySelector('.card');

    function triggerConfetti() {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff0000', '#ff69b4', '#ff1493', '#ff69b4']
            });
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff0000', '#ff69b4', '#ff1493', '#ff69b4']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    yesBtn.addEventListener('click', function() {
        triggerConfetti();
        valentineContainer.innerHTML = '<h3>Yay! I knew you would say yes! 💖</h3>';
    });

    noBtn.addEventListener('mouseover', function() {
        const cardRect = card.getBoundingClientRect();
        const buttonRect = this.getBoundingClientRect();
        
        const maxWidth = window.innerWidth - buttonRect.width - 20;
        const maxHeight = window.innerHeight - buttonRect.height - 20;
        
        let randomX, randomY;
        let attempts = 0;
        const maxAttempts = 10;

        do {
            randomX = Math.min(Math.max(20, Math.random() * maxWidth), maxWidth);
            randomY = Math.min(Math.max(20, Math.random() * maxHeight), maxHeight);
            attempts++;
        } while (
            attempts < maxAttempts &&
            randomX + buttonRect.width > cardRect.left - 50 &&
            randomX < cardRect.right + 50 &&
            randomY + buttonRect.height > cardRect.top - 50 &&
            randomY < cardRect.bottom + 50
        );

        this.style.position = 'fixed';
        this.style.left = randomX + 'px';
        this.style.top = randomY + 'px';
        this.style.transition = 'all 0.2s ease';
    });
}); 

