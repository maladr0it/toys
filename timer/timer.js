const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const fractionsEl = document.getElementById("fractions");
const startStopButton = document.getElementById("start-stop-button");
const resetButton = document.getElementById("reset-button");

let running = false;
let elapsed = 0;
let lastTick;

function updateDisplay(elapsed) {
  const asDate = new Date(elapsed);
  const fractions = Math.floor(asDate.getMilliseconds() / 10);
  const seconds = asDate.getSeconds();
  const minutes = asDate.getMinutes();

  fractionsEl.innerText = fractions.toString().padStart(2, "0");
  secondsEl.innerText = seconds.toString().padStart(2, "0");
  minutesEl.innerText = minutes.toString().padStart(2, "0");
}

function tick(now) {
  if (!running) {
    lastTick = undefined;
    return;
  }
  if (lastTick) {
    elapsed += now - lastTick;
    updateDisplay(elapsed);
  }
  lastTick = now;
  requestAnimationFrame(tick);
}

function startTimer() {
  running = true;
  startStopButton.innerText = "Pause";
  requestAnimationFrame(tick);
}

function pauseTimer() {
  running = false;
  startStopButton.innerText = "Start";
}

function resetTimer() {
  pauseTimer();
  elapsed = 0;
  updateDisplay(elapsed);
}

function toggleTimer() {
  if (!running) {
    startTimer();
  } else {
    pauseTimer();
  }
}

startStopButton.onclick = toggleTimer;
resetButton.onclick = resetTimer;
