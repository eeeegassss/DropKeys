const gameArea = document.getElementById('game-area');
const keyboard = document.getElementById('keyboard');
const scoreEl = document.getElementById('score');
const comboEl = document.getElementById('combo');
const livesEl = document.getElementById('lives');

let score = 0;
let combo = 1;
let lives = 3;
let gameInterval = null;
let currentMode = '';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split([]);

function spawnKeyboard() {
  keyboard.innerHTML = '';
  letters.forEach(letter => {
    const key = document.createElement('div');
    key.className = 'key';
    key.textContent = letter;
    key.addEventListener('touchstart', () => handleKey(letter));
    keyboard.appendChild(key);
  });
}

function spawnLetter() {
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const div = document.createElement('div');
  div.className = 'falling-letter';
  div.textContent = letter;
  div.style.position = 'absolute';
  div.style.left = `${Math.random() * 80 + 10}%`;
  div.style.top = '0%';
  div.style.fontSize = '2.5rem';
  div.style.transition = 'top 3s linear';
  div.style.color = '#fff';
  div.style.textShadow = '0 0 6px #0ff';
  gameArea.appendChild(div);

  setTimeout(() => {
    div.style.top = '90%';
  }, 50);

  setTimeout(() => {
    if (gameArea.contains(div)) {
      gameArea.removeChild(div);
      lives--;
      livesEl.textContent = lives;
      combo = 1;
      if (lives <= 0) endGame();
    }
  }, 3000);
}

function handleKey(letter) {
  const falling = [...document.querySelectorAll('.falling-letter')];
  const hit = falling.find(el => el.textContent === letter);
  if (hit) {
    gameArea.removeChild(hit);
    score++;
    combo++;
  } else {
    combo = 1;
    navigator.vibrate(100);
  }
  updateHUD();
}

function updateHUD() {
  scoreEl.textContent = score;
  comboEl.textContent = combo + 'x';
  livesEl.textContent = lives;
}

function startGame(mode) {
  currentMode = mode;
  resetGame();
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(spawnLetter, 1500);
}

function resetGame() {
  score = 0;
  combo = 1;
  lives = 3;
  gameArea.innerHTML = '';
  updateHUD();
}

function endGame() {
  clearInterval(gameInterval);
  alert("Game Over!");
}

document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => startGame(btn.dataset.mode));
});

spawnKeyboard();