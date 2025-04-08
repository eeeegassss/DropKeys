const menu = document.getElementById('menu');
const game = document.getElementById('game');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const keyboard = document.getElementById('keyboard');
const gameInfo = document.getElementById('gameInfo');
const scoreDisplay = document.getElementById('scoreDisplay');

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const colors = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db'];

let mode = '';
let score = 0;
let lives = 3;
let timer = 60;
let multiplier = 1;
let blocks = [];
let interval;
let fallSpeed = 1;

function randomLetter() {
  return letters[Math.floor(Math.random() * letters.length)];
}
function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function createBlock() {
  const block = {
    x: Math.random() * (canvas.width - 30),
    y: -30,
    char: randomLetter(),
    color: randomColor()
  };
  blocks.push(block);
}

function drawBlocks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let b of blocks) {
    ctx.fillStyle = b.color;
    ctx.fillRect(b.x, b.y, 30, 30);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(b.char, b.x + 8, b.y + 22);
  }
}

function updateBlocks() {
  for (let b of blocks) {
    b.y += fallSpeed;
    if (b.y > canvas.height) {
      if (mode === 'survival') lives--;
      if (mode === 'endless') multiplier = 1;
      blocks.splice(blocks.indexOf(b), 1);
    }
  }
}

function gameLoop() {
  updateBlocks();
  drawBlocks();
  gameInfo.innerHTML =
    mode === 'survival' ? '❤'.repeat(lives) :
    mode === 'time' ? `⏱ ${timer}` :
    '';
  scoreDisplay.innerHTML =
    mode === 'endless' ? `${score} <span style="color:red">${multiplier}x</span>` : score;

  if (lives <= 0 || timer <= 0) {
    endGame();
  }
}

function keyPress(char) {
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].char === char) {
      blocks.splice(i, 1);
      score += 10 * multiplier;
      if (mode === 'endless') multiplier++;
      return;
    }
  }
  if (mode === 'survival') lives--;
  if (mode === 'endless') multiplier = 1;
}

function startGame(selectedMode) {
  mode = selectedMode;
  menu.style.display = 'none';
  game.style.display = 'flex';
  blocks = [];
  score = 0;
  lives = 2;
  timer = 60;
  multiplier = 1;

  clearInterval(interval);
  interval = setInterval(() => {
    createBlock();
    gameLoop();
  }, 500);

  if (mode === 'time') {
    let countdown = setInterval(() => {
      timer--;
      if (timer <= 0) clearInterval(countdown);
    }, 1000);
  }
}

function endGame() {
  clearInterval(interval);
  alert(`Game Over! Your score: ${score}`);
  menu.style.display = 'block';
  game.style.display = 'none';
}

document.querySelector('.survival').onclick = () => startGame('survival');
document.querySelector('.time').onclick = () => startGame('time');
document.querySelector('.endless').onclick = () => startGame('endless');
document.querySelector('.two').onclick = () => alert('2P Mode Coming Soon!');

document.getElementById('backBtn').onclick = () => {
  clearInterval(interval);
  menu.style.display = 'block';
  game.style.display = 'none';
};

// Render on-screen keyboard
letters.forEach(letter => {
  const btn = document.createElement('button');
  btn.innerText = letter;
  btn.onclick = () => keyPress(letter);
  keyboard.appendChild(btn);
});