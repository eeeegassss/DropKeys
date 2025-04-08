document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".game-button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const mode = button.querySelector(".label").innerText.trim();
      alert(`Launching ${mode} mode...`);
      // Here you'd navigate or launch the game mode
    });
  });

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service Worker Registered'))
      .catch(err => console.error('Service Worker failed:', err));
  }
});