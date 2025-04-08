const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 80;

let currentMode = null;
let letters = [];
let score = 0;
let lives = 3;
let timer = 60;
let gameInterval;

document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.onclick = () => startGame(btn.dataset.mode);
});

document.getElementById("quit-btn").onclick = () => location.reload();

function startGame(mode) {
  currentMode = mode;
  score = 0;
  lives = 3;
  timer = 60;
  letters = [];
  document.getElementById("menu-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
  spawnLetters();
  gameInterval = setInterval(updateGame, 50);
  if (mode === "time" || mode === "2p") {
    setInterval(() => timer--, 1000);
  }
}

function spawnLetters() {
  setInterval(() => {
    const char = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    letters.push({
      char,
      x: Math.random() * (canvas.width - 40),
      y: 0,
      speed: 2 + Math.random() * 3,
    });
  }, 1000);
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let letter of letters) {
    letter.y += letter.speed;
    ctx.fillStyle = "#f4d35e";
    ctx.fillRect(letter.x, letter.y, 40, 40);
    ctx.fillStyle = "#1b1c1d";
    ctx.font = "20px Poppins";
    ctx.fillText(letter.char, letter.x + 14, letter.y + 26);
  }

  letters = letters.filter(l => {
    if (l.y > canvas.height) {
      if (currentMode === "survival") lives--;
      return false;
    }
    return true;
  });

  document.getElementById("score").textContent = score;
  document.getElementById("status").textContent =
    currentMode === "survival"
      ? `❤️ ${lives}`
      : currentMode === "time" || currentMode === "2p"
      ? `${timer}s`
      : "";

  if (lives <= 0 || (timer <= 0 && currentMode !== "endless")) {
    clearInterval(gameInterval);
    alert("Game Over! Your score: " + score);
    location.reload();
  }
}

window.addEventListener("keydown", e => {
  const i = letters.findIndex(l => l.char === e.key.toLowerCase());
  if (i !== -1) {
    letters.splice(i, 1);
    score++;
  }
});