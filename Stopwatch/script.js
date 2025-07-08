let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let timer = null;
let isRunning = false;

function updateDisplay() {
  const display = document.getElementById("display");
  display.innerText =
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}:` +
    `${String(milliseconds).padStart(2, '0')}`;
}

function runTimer() {
  milliseconds += 1;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  updateDisplay();
}

function startStop() {
  const startBtn = document.querySelector(".btn:nth-child(2)");

  if (!isRunning) {
    timer = setInterval(runTimer, 10);
    isRunning = true;
    startBtn.innerText = "Stop";
    startBtn.classList.add("red-btn");
  } else {
    clearInterval(timer);
    isRunning = false;
    startBtn.innerText = "Start";
    startBtn.classList.remove("red-btn");
  }
}

function lap() {
  if (hours + minutes + seconds + milliseconds === 0) return;

  const lapTime =
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}:` +
    `${String(milliseconds).padStart(2, '0')}`;

  const history = document.getElementById("history");
  const entry = document.createElement("div");
  entry.innerText = `Lap: ${lapTime}`;
  history.prepend(entry);

  resetTimer();
  updateDisplay();
}

function reset() {
  clearInterval(timer);
  isRunning = false;

  const startBtn = document.querySelector(".btn:nth-child(2)");
  startBtn.innerText = "Start";
  startBtn.classList.remove("red-btn");

  resetTimer();
  updateDisplay();
  document.getElementById("history").innerHTML = "";
}

function resetTimer() {
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
}
