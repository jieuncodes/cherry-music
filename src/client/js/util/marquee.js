const musicCards = document.querySelectorAll("#music-card");

const addMarquee = (event) => {
  const trackTitleArea = event.currentTarget.querySelector(".track-title-area");
  const trackTitle = trackTitleArea.querySelector(".track-title");
  if (trackTitle.clientWidth > trackTitleArea.clientWidth) {
    trackTitleArea.classList.add("marquee");
    trackTitle.classList.add("marquee-content");
    trackTitle.classList.add("scroll");

    const cloneTitle = trackTitle.cloneNode(true);
    trackTitleArea.appendChild(cloneTitle);
  }
};

const removeMarquee = (event) => {
  const trackTitleArea = event.currentTarget.querySelector(".track-title-area");
  const trackTitle = trackTitleArea.querySelector(".track-title");
  trackTitleArea.classList.remove("marquee");
  trackTitle.classList.remove("marquee-content");
  trackTitle.classList.remove("scroll");

  if (trackTitleArea.childNodes.length > 1) {
    trackTitleArea.removeChild(trackTitleArea.lastChild);
  }
};

musicCards.forEach((card) => {
  card.addEventListener("mouseenter", addMarquee);
  card.addEventListener("mouseleave", removeMarquee);
});

export const paintTitleWithMarquee = (trackTitleText) => {
  const marqueeElements= `
  <div class="track-title-area marquee">
    <div class="track-title marquee-content scroll">
      ${trackTitleText} 
    </div> 
    <div class="track-title marquee-content scroll">
      ${trackTitleText} 
    </div> 
  </div>`;
  return marqueeElements;
}

