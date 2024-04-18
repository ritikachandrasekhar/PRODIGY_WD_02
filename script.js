let timer;
let isRunning = false;
let isPaused = false;
let lapCount = 1;

function startStop() {
    const startStopBtn = document.getElementById("startStop");
    const display = document.getElementById("display");
    const lapsList = document.getElementById("laps");
    
    if (!isRunning && !isPaused) {
        // Start the stopwatch
        timer = setInterval(updateDisplay, 1000);
        startStopBtn.textContent = "Stop";
        isRunning = true;
    } else if (isRunning && !isPaused) {
        // Pause the stopwatch
        clearInterval(timer);
        startStopBtn.textContent = "Resume";
        isPaused = true;
    } else if (isRunning && isPaused) {
        // Resume the stopwatch
        timer = setInterval(updateDisplay, 1000);
        startStopBtn.textContent = "Stop";
        isPaused = false;
    } else {
        // Stop the stopwatch
        clearInterval(timer);
        startStopBtn.textContent = "Start";
        isRunning = false;
        isPaused = false;
        resetDisplay();
        lapCount = 1;
        // Clear laps
        lapsList.innerHTML = '';
    }
}

function resetStopwatch() {
    clearInterval(timer);
    const startStopBtn = document.getElementById("startStop");
    startStopBtn.textContent = "Start";
    isRunning = false;
    isPaused = false;
    resetDisplay();
    lapCount = 1;
    const lapsList = document.getElementById("laps");
    // Clear laps
    lapsList.innerHTML = '';
}

function updateDisplay() {
    const display = document.getElementById("display");
    const time = display.textContent.split(":");
    let hours = parseInt(time[0]);
    let minutes = parseInt(time[1]);
    let seconds = parseInt(time[2]);

    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }

    display.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function resetDisplay() {
    const display = document.getElementById("display");
    display.textContent = "00:00:00";
}

function lapReset() {
    const display = document.getElementById("display");
    const lapsList = document.getElementById("laps");
    if (isRunning && !isPaused) {
        const lapTime = document.createElement("li");
        lapTime.textContent = `Lap ${lapCount++}: ${display.textContent}`;
        lapsList.appendChild(lapTime);
    }
}
