export const showLoadingScreen = () => {
  const loadingScreen = document.getElementById("loading-screen");

  loadingScreen.style.display = "flex";
};

export const hideLoadingScreen = () => {
  const loadingScreen = document.getElementById("loading-screen");

  loadingScreen.style.display = "none";
};

window.addEventListener("DOMContentLoaded", showLoadingScreen);
window.addEventListener("load", hideLoadingScreen);
