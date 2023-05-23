import "../scss/styles.scss";

console.log("hi");

window.addEventListener("scroll", function () {
  const backgroundGradient = document.querySelector(".background-gradient");
  if (window.pageYOffset > 0) {
    backgroundGradient.classList.add("inactive");
  } else {
    backgroundGradient.classList.remove("inactive");
  }
});
