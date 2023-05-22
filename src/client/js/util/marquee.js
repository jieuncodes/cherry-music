const musicCards = document.querySelectorAll("#music-card");

const addMarquee = (event) => {
  const trackTitleArea = event.currentTarget.querySelector(".track-title-area");
  const trackTitle = trackTitleArea.querySelector(".track-title");

  if (trackTitle.clientWidth > trackTitleArea.clientWidth) {
    trackTitle.classList.add("marquee-animation");

    const cloneTitle = trackTitle.cloneNode(true);
    trackTitleArea.appendChild(cloneTitle);
  }
};

const removeMarquee = (event) => {
  const trackTitleArea = event.currentTarget.querySelector(".track-title-area");
  const trackTitle = trackTitleArea.querySelector(".track-title");

  trackTitle.classList.remove("marquee-animation");

  if (trackTitleArea.childNodes.length > 1) {
    trackTitleArea.removeChild(trackTitleArea.lastChild);
  }
};

musicCards.forEach((card) => {
  card.addEventListener("mouseenter", addMarquee);
  card.addEventListener("mouseleave", removeMarquee);
});
