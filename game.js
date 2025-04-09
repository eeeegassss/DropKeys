document.querySelectorAll('.game-card').forEach(card => {
  card.addEventListener('click', () => {
    alert(`Launching ${card.querySelector('h3').innerText}...`);
  });
});