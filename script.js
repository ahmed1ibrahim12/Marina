const countdownContainer = document.querySelector('.countdown-container');
const countdownDisplay = document.querySelector('.countdown-display');
const progressBar = document.querySelector('.progress-bar-inner');
const confettiContainer = document.querySelector('.confetti-container');

let targetDate = new Date('2025-06-29'); // default target date
let countdownInterval;

function createConfetti() {
    const colors = ['#00ff87', '#60efff', '#ff00aa', '#ffcc00', '#ff0066', '#00ccff'];
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confettiContainer.appendChild(confetti);
    
    // Remove confetti after animation completes
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

function updateCountdown() {
    const now = new Date();
    const timeRemaining = targetDate.getTime() - now.getTime();
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    countdownDisplay.innerHTML = `
        <div class="time-unit">
            <span class="days">${days}</span>
            <span class="label">Days</span>
        </div>
        <div class="time-unit">
            <span class="hours">${hours}</span>
            <span class="label">Hours</span>
        </div>
        <div class="time-unit">
            <span class="minutes">${minutes}</span>
            <span class="label">Minutes</span>
        </div>
        <div class="time-unit">
            <span class="seconds">${seconds}</span>
            <span class="label">Seconds</span>
        </div>
    `;

    const progress = (timeRemaining / (targetDate.getTime() - new Date().getTime())) * 100;
    progressBar.style.width = `${progress}%`;

    if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        countdownContainer.innerHTML = `
            <h2 class="celebration">We've Reached Our Goal!</h2>
            <p class="celebration">🎉 Congratulations! 🎉</p>
        `;
        
        // Start confetti animation
        const confettiInterval = setInterval(createConfetti, 100);
        
        // Stop confetti after 5 seconds
        setTimeout(() => {
            clearInterval(confettiInterval);
        }, 5000);
    }
}

updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000);
