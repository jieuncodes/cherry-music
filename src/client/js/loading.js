export const showLoadingScreen = () => {
  const loadingScreen = document.getElementById("loading-screen");
  console.log("l", loadingScreen);

  console.log("show loading");
  loadingScreen.style.display = "flex";
};

export const hideLoadingScreen = () => {
  const loadingScreen = document.getElementById("loading-screen");
  console.log("l", loadingScreen);

  console.log("hide loading");
  loadingScreen.style.display = "none";
};

window.addEventListener("DOMContentLoaded", showLoadingScreen);
