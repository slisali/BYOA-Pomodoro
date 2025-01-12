let timeLeft = 30 * 60;  // Initial time (30 minutes in seconds)
let isLongMode = true;   // Start with 30 minutes mode
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const toggleButton = document.getElementById('toggle');

const WORK_TIME = 30 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds
const minuteBeep = document.getElementById('minuteBeep');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = WORK_TIME;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                minuteBeep.play();
                clearInterval(timerId);
                timerId = null;
                switchMode();
                startTimer();
            }
        }, 1000);
        startButton.disabled = true;
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startButton.disabled = false;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    modeText.textContent = 'Work Time';
    updateDisplay();
    startButton.disabled = false;
}

toggleButton.addEventListener('click', () => {
    isLongMode = !isLongMode;  // Switch between true/false
    timeLeft = isLongMode ? 30 * 60 : 5 * 60;  // Set to either 30 or 5 minutes
    updateDisplay();  // Update the display with new time
    modeText.textContent = isLongMode ? "Work Time (30min)" : "Short Break (5min)";
});

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize the display
resetTimer(); 