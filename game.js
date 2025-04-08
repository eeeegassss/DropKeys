const gameArea = document.getElementById('game-area');
const keyboard = document.getElementById('keyboard');
const keyboard2p = document.getElementById('keyboard2p');
const scoreEl = document.getElementById('score');
const comboEl = document.getElementById('combo');
const livesEl = document.getElementById('lives');
const powerUpsEl = document.getElementById('power-ups');

let score = 0, combo = 1, lives = 3;
let currentMode = 'survival';
let fallInterval;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const powerUps = ['2X', 'BOMB', 'SLOW'];

function spawnKeyboard(keyboardEl, handlerPrefix = '') {
  keyboardEl.innerHTML = '';
  letters.forEach(letter => {
    const key = document.createElement('div');
    key.className = 'key';
    key.textContent = letter;
    key.addEventListener('touchstart', () => window[handlerPrefix + 'handleKey'](letter));
    keyboardEl.appendChild(key);
  });
}

function spawnLetter(player = 1) {
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const div = document.createElement('div');
  div.className = 'falling-letter';
  div.textContent = letter;
  div.style.position = 'absolute';
  div.style.left = `${Math.random() * 80 + 10}%`;
  div.style.top = '0%';
  div.style.fontSize = '2rem';
  div.style.transition = 'top 3s linear';
  div.dataset.player = player;
  gameArea.appendChild(div);

  setTimeout(() => { div.style.top = '90%'; }, 50);
  setTimeout(() => {
    if (gameArea.contains(div)) {
      gameArea.removeChild(div);
      if (player === 1) {
        lives--;
        if (lives <= 0) alert('Game Over');
        updateHUD();
      }
    }
  }, 3000);
}

function handleKey(letter) {
  const falling = [...document.querySelectorAll('.falling-letter')];
  const hit = falling.find(el => el.textContent === letter && el.dataset.player === '1');
  if (hit) {
    gameArea.removeChild(hit);
    score++;
    combo++;
  } else {
    combo = 1;
    navigator.vibrate(150);
  }
  updateHUD();
}

function handleKey2(letter) {
  const falling = [...document.querySelectorAll('.falling-letter')];
  const hit = falling.find(el => el.textContent === letter && el.dataset.player === '2');
  if (hit) gameArea.removeChild(hit);
}

function updateHUD() {
  scoreEl.textContent = score;
  comboEl.textContent = combo + 'x';
  livesEl.textContent = lives;
}

function resetGame() {
  score = 0;
  combo = 1;
  lives = 3;
  clearInterval(fallInterval);
  gameArea.innerHTML = '';
  updateHUD();
}

function activateMode(mode) {
  resetGame();
  currentMode = mode;
  if (mode === '2p') {
    keyboard2p.style.display = 'flex';
    spawnKeyboard(keyboard2p, 'handleKey2');
    fallInterval = setInterval(() => {
      spawnLetter(1);
      spawnLetter(2);
    }, 1500);
  } else {
    keyboard2p.style.display = 'none';
    spawnKeyboard(keyboard);
    fallInterval = setInterval(() => spawnLetter(1), 1500);
  }
}

document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    activateMode(btn.dataset.mode);
  });
});

spawnKeyboard(keyboard);