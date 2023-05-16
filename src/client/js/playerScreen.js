const playerBox = document.getElementById("player-box");
const playerScreen = document.getElementById("player-screen");
const chevron = document.querySelector(".fa-chevron-down");


playerBox.addEventListener('click', function() {
    playerScreen.classList.add('active');
  });

chevron.addEventListener('click', function() {
    playerScreen.classList.remove('active');
  });