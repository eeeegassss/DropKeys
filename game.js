// DROPKEYS: Main Menu UI Controller

document.addEventListener("DOMContentLoaded", () => {
  console.log("DropKeys Main Menu Loaded");

  // Add event listeners to buttons
  const modes = document.querySelectorAll(".menu-btn");
  modes.forEach(button => {
    button.addEventListener("click", () => {
      alert(`Mode Selected: ${button.textContent}`);
      // Future: loadGameMode(button.classList[1])
    });
  });
});