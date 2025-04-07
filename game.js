const gameArea = document.getElementById('game-area');
const keyboard = document.getElementById('keyboard');
const scoreEl = document.getElementById('score');
const comboEl = document.getElementById('combo');
const livesEl = document.getElementById('lives');

let score = 0;
let combo = 1;
let lives = 3;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function spawnKeyboard() {
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
  div.style.fontSize = '2rem';
  div.style.transition = 'top 3s linear';
  gameArea.appendChild(div);

  setTimeout(() => {
    div.style.top = '90%';
  }, 50);

  setTimeout(() => {
    if (gameArea.contains(div)) {
      gameArea.removeChild(div);
      lives--;
      livesEl.textContent = lives;
      if (lives <= 0) alert('Game Over');
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
    navigator.vibrate(200);
  }
  updateHUD();
}

function updateHUD() {
  scoreEl.textContent = score;
  comboEl.textContent = combo + 'x';
}

document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    resetGame();
    setInterval(spawnLetter, 1500);
  });
});

function resetGame() {
  score = 0;
  combo = 1;
  lives = 3;
  updateHUD();
  gameArea.innerHTML = '';
}

spawnKeyboard();