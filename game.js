let selectedMode = '';
let selectedDifficulty = 'Medium';
let isFriendGame = false;

const difficultyMap = {
  1: 'Easy',
  2: 'Medium',
  3: 'Hard'
};

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
    screen.classList.remove('active');
  });

  const target = document.getElementById(id);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
  }
}

function selectMode(mode) {
  selectedMode = mode;
  showScreen('difficultyMenu');
}

document.getElementById('difficultySlider').addEventListener('input', e => {
  const val = parseInt(e.target.value);
  selectedDifficulty = difficultyMap[val];
  document.getElementById('difficultyLabel').textContent = selectedDifficulty;
});

function startGame(friend = false) {
  isFriendGame = friend;
  document.getElementById('currentMode').textContent = selectedMode;
  document.getElementById('currentDifficulty').textContent = selectedDifficulty;
  document.getElementById('friendLabel').classList.toggle('hidden', !isFriendGame);
  showScreen('gameScreen');
}