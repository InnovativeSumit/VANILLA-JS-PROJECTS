let [seconds, minutes, hours] = [0, 0, 0];
let displayTime = document.getElementById("displayTime");
let timer = null;
let lapCount = 1;
let lapsContainer = document.getElementById("lapsContainer");

// Button elements
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const portfolioBtn = document.getElementById("portfolioBtn");

// Event listeners
startBtn.addEventListener("click", watchStart);
stopBtn.addEventListener("click", watchStop);
resetBtn.addEventListener("click", watchReset);
lapBtn.addEventListener("click", recordLap);

// Portfolio button already linked in HTML with target="_blank"

function stopwatch() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    displayTime.innerHTML = `${h}:${m}:${s}`;
}

function watchStart() {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(stopwatch, 1000);
    
    // Update button states
    startBtn.disabled = true;
    startBtn.style.opacity = "0.6";
    stopBtn.disabled = false;
    stopBtn.style.opacity = "1";
}

function watchStop() {
    clearInterval(timer);
    
    // Update button states
    startBtn.disabled = false;
    startBtn.style.opacity = "1";
    stopBtn.disabled = true;
    stopBtn.style.opacity = "0.6";
}

function watchReset() {
    clearInterval(timer);
    [seconds, minutes, hours] = [0, 0, 0];
    displayTime.innerHTML = "00:00:00";
    lapsContainer.innerHTML = "";
    lapCount = 1;
    
    // Update button states
    startBtn.disabled = false;
    startBtn.style.opacity = "1";
    stopBtn.disabled = false;
    stopBtn.style.opacity = "1";
}

function recordLap() {
    if (timer === null) return; // Don't record if stopwatch isn't running
    
    const lapTime = displayTime.innerHTML;
    const lapItem = document.createElement("div");
    lapItem.className = "lap-item";
    lapItem.innerHTML = `
        <span class="lap-number">Lap ${lapCount}</span>
        <span class="lap-time">${lapTime}</span>
    `;
    
    lapsContainer.prepend(lapItem);
    lapCount++;
    
    // Scroll to top of laps container
    lapsContainer.scrollTop = 0;
    
    // Add visual feedback
    lapBtn.style.transform = "scale(1.1)";
    setTimeout(() => {
        lapBtn.style.transform = "scale(1)";
    }, 200);
}