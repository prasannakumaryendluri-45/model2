let startTime = 0;
let updatedTime = 0;
let running = false;
let elapsedTime = 0;
let lapCount = 0;
let interval;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const timeDisplay = document.getElementById('time-display');
const lapList = document.getElementById('lap-list');

// Format time into HH:MM:SS format
function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return (
    String(hours).padStart(2, '0') + ':' +
    String(minutes % 60).padStart(2, '0') + ':' +
    String(seconds % 60).padStart(2, '0')
  );
}

// Start or Pause the stopwatch
function startStop() {
  if (!running) {
    startTime = Date.now() - elapsedTime;  // Adjust start time if resumed
    interval = setInterval(updateTime, 10);  // Update every 10ms
    startStopBtn.textContent = 'Pause';  // Change button to 'Pause'
    running = true;
  } else {
    clearInterval(interval);  // Stop the timer
    startStopBtn.textContent = 'Resume';  // Change button to 'Resume'
    running = false;
  }
}

// Update time display
function updateTime() {
  updatedTime = Date.now();
  elapsedTime = updatedTime - startTime;
  timeDisplay.textContent = formatTime(elapsedTime); // Display formatted time
}

// Reset stopwatch
function reset() {
  clearInterval(interval);  // Clear the interval to stop the stopwatch
  running = false;
  elapsedTime = 0;
  timeDisplay.textContent = '00:00:00';  // Reset the time display
  lapList.innerHTML = '';  // Clear the lap list
  startStopBtn.textContent = 'Start';  // Change button text to 'Start'
}

// Record a lap
function recordLap() {
  if (running) {
    lapCount++;
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
  }
}

// Event listeners for buttons
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
