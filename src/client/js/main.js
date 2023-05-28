import "../scss/styles.scss";

const paintMainScreenBg = () => {
  const backgroundGradient = document.querySelector(".background-gradient");
  if (backgroundGradient) {
    if (window.pageYOffset > 0) {
      backgroundGradient.classList.add("inactive");
    } else {
      backgroundGradient.classList.remove("inactive");
    }
  }};

window.addEventListener("scroll", paintMainScreenBg);
