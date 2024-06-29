let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapNumber = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1000);
        startStopBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.textContent = 'Start';
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function resetStopwatch() {
    clearInterval(tInterval);
    display.textContent = '00:00:00';
    running = false;
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
    lapNumber = 0;
}

function recordLap() {
    if (running) {
        lapNumber++;
        const lapTime = display.textContent;
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapNumber}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
