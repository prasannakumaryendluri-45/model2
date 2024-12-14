let startTime;
let updatedTime;
let difference;
let running = false;
let timerInterval;
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let lapCount = 1;

// Elements
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const lapList = document.getElementById("lapList");

// Start/Pause the stopwatch
startStopBtn.addEventListener("click", function() {
    if (!running) {
        running = true;
        startStopBtn.innerText = "Pause";
        startTime = new Date().getTime() - difference; // Start time calculation
        timerInterval = setInterval(updateTime, 10); // Update every 10 ms
    } else {
        running = false;
        startStopBtn.innerText = "Start";
        clearInterval(timerInterval); // Stop the timer
    }
});

// Reset the stopwatch
resetBtn.addEventListener("click", function() {
    running = false;
    clearInterval(timerInterval);
    startStopBtn.innerText = "Start";
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    lapCount = 1;
    updateDisplay(); // Update display with zero time
    lapList.innerHTML = ""; // Clear lap times
});

// Record lap time
lapBtn.addEventListener("click", function() {
    const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
    lapCount++;
});

// Update time display
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime; // Calculate the difference in time

    // Calculate hours, minutes, seconds, and milliseconds
    hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((difference % (1000 * 60)) / 1000);
    milliseconds = Math.floor((difference % 1000) / 10);

    updateDisplay(); // Update the display
}

// Update the HTML display
function updateDisplay() {
    hoursDisplay.textContent = formatTime(hours);
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

// Format time to always show two digits
function formatTime(time) {
    if (time < 10) {
        return `0${time}`;
    }
    return time;
}
