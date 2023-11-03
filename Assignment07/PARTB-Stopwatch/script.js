// DOM Elements
const timerLabel = document.getElementById('timer');
const datePicker = document.getElementById('datePicker');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

// Stopwatch variables
let startTime;
let intervalId;
let pausedTime = 0;
let running = false;

// Format time in "HH:MM:SS" format
function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Update the timer display
function updateTimer() {
    const currentTime = new Date() - startTime + pausedTime;
    timerLabel.textContent = formatTime(currentTime);
}

// Start the stopwatch
startBtn.addEventListener('click', async () => {
    if (!running) {
        startTime = new Date() - pausedTime;
        intervalId = setInterval(updateTimer, 1000);
        running = true;
    }
});

// Stop the stopwatch
stopBtn.addEventListener('click', () => {
    if (running) {
        clearInterval(intervalId);
        pausedTime = new Date() - startTime;
        running = false;
    }
});

// Reset the stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    pausedTime = 0;
    running = false;
    timerLabel.textContent = '00:00:00';
});

// Initialize date picker with the current date
datePicker.valueAsDate = new Date();
datePicker.min = '1970-01-01T00:00';
datePicker.max = '2100-12-31T23:59';
datePicker.addEventListener('input', () => {
    const selectedDate = new Date(datePicker.value);
});
