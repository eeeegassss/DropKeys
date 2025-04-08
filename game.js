const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const timerEl = document.getElementById("timer");
const keyboardEl = document.getElementById("keyboard");
let currentMode = "endless";
let letters = [];
let score = 0;
let lives = 3;
let timeLeft = 60;
let dropInterval = 1000;
let gameInterval;
let timerInterval;
let isGameRunning = false;

function startGame(mode) {
  currentMode = mode;
  document.getElementById("main-menu").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
  score = 0;
  lives = 3;
  timeLeft = 60;
  letters = [];
  createKeyboard();
  resizeCanvas();
  if (mode === "time") startTimer();
  gameInterval = setInterval(updateGame, dropInterval);
  isGameRunning = true;
}

function quitGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  isGameRunning = false;
  document.getElementById("main-menu").classList.remove("hidden");
  document.getElementById("game-screen").classList.add("hidden");
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) quitGame();
  }, 1000);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.6;
}

function createKeyboard() {
  keyboardEl.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const char = String.fromCharCode(i);
    const btn = document.createElement("button");
    btn.textContent = char;
    btn.onclick = () => pressKey(char);
    keyboardEl.appendChild(btn);
  }
}

function pressKey(char) {
  const index = letters.findIndex(l => l.letter === char);
  if (index > -1) {
    letters.splice(index, 1);
    score++;
    scoreEl.textContent = score;
  }
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.3) {
    letters.push({
      letter: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
      x: Math.random() * (canvas.width - 20),
      y: 0
    });
  }

  letters.forEach((l, i) => {
    l.y += 5;
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(l.letter, l.x, l.y);
    if (l.y > canvas.height) {
      letters.splice(i, 1);
      if (currentMode === "survival") {
        lives--;
        livesEl.textContent = "♥".repeat(lives);
        if (lives <= 0) quitGame();
      }
    }
  });
}

window.addEventListener("resize", resizeCanvas);