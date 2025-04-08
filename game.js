let selectedMode = '';
let difficulty = 2;

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
    screen.classList.add('hidden');
  });
  document.getElementById(id).classList.add('active');
  document.getElementById(id).classList.remove('hidden');
}

function selectMode(mode) {
  selectedMode = mode;
  showScreen('difficultyMenu');
}

document.getElementById('difficultySlider').addEventListener('input', function () {
  difficulty = parseInt(this.value);
  const label = ['Easy', 'Medium', 'Hard'][difficulty - 1];
  document.getElementById('difficultyLabel').textContent = label;
});

function startGame() {
  showScreen('gameScreen');
  document.getElementById('currentMode').textContent = selectedMode;
  document.getElementById('currentDifficulty').textContent = ['Easy', 'Medium', 'Hard'][difficulty - 1];
  // TODO: Add your actual game logic here
}

function playWithFriend() {
  alert(`Multiplayer mode coming soon! (${selectedMode} - ${['Easy','Medium','Hard'][difficulty-1]})`);
  // TODO: Hook up multiplayer later
}

// Init on first load
showScreen('homeScreen');