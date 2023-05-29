import { playerReadyPromise, state } from "./main.js";
import {
  handleMusicCardClick,
  playerBox,
  playerBoxNextBtn,
  playerBoxPlayBtn,
  togglePlayPauseBtn,
} from "./player.js";
import {
  playerScreenNextBtn,
  playerScreenPlayBtn,
  playerScreenPrevBtn,
} from "./playerScreen.js";
import { paintTitleWithMarquee } from "./util/marquee.js";

//bg painters
export const paintMainScreenBg = () => {
  const backgroundGradient = document.querySelector(".background-gradient");
  if (backgroundGradient) {
    if (window.pageYOffset > 0) {
      backgroundGradient.classList.add("inactive");
    } else {
      backgroundGradient.classList.remove("inactive");
    }
  }
};

//player painters
export const paintPlayerWithTrackInfo = () => {
  togglePlayPauseBtn();
  const track = state.clientPlaylist[state.currQueueIndex];
  if (track) {
    const albumImgArea = playerBox.querySelector(".album-cover");
    const trackTitleArea = playerBox.querySelector(".track-title-area");
    const artistArea = playerBox.querySelector(".artist");

    console.log("track", track.albumImageUrl);

    albumImgArea.style.backgroundImage = `url(${track.albumImageUrl})`;
    artistArea.textContent = track.artist;
    trackTitleArea.innerHTML = paintTitleWithMarquee(track.title);
  } else {
    console.log("No track found at current index:", state.currQueueIndex);
  }
};

//button painters
export const replaceClassForButton = (button, oldClass, newClass) => {
  button.childNodes[0].classList.replace(oldClass, newClass);
};

export const paintToPauseBtn = () => {
  replaceClassForButton(playerBoxPlayBtn, "fa-play", "fa-pause");
  replaceClassForButton(playerScreenPlayBtn, "fa-play", "fa-pause");
  playerScreenPlayBtn.childNodes[0].style.fontSize = "1.7rem";
};

export const paintToPlayBtn = () => {
  replaceClassForButton(playerBoxPlayBtn, "fa-pause", "fa-play");
  replaceClassForButton(playerScreenPlayBtn, "fa-pause", "fa-play");
};

const disableButtonConditionally = (button, deadEnd) => {
  if (deadEnd) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
};

export const updateNextButtonStatus = () => {
  const deadEnd =
    state.clientPlaylist.length <= 1 ||
    state.currQueueIndex === state.clientPlaylist.length - 1;
  disableButtonConditionally(playerBoxNextBtn, deadEnd);
  disableButtonConditionally(playerScreenNextBtn, deadEnd);
};

export const updatePrevButtonStatus = () => {
  const deadEnd = state.currQueueIndex === 0;
  disableButtonConditionally(playerScreenPrevBtn, deadEnd);
};

//eventListener binders
export const bindMusicCardEvents = () => {
  const musicCards = document.querySelectorAll("#music-card");

  musicCards.forEach((musicCard) => {
    const {
      videoid: videoId,
      title,
      artist,
      albumimageurl: albumImageUrl,
    } = musicCard.dataset;

    if (videoId) {
      musicCard.addEventListener("click", () =>
        handleMusicCardClick({ videoId, title, artist, albumImageUrl })
      );
    } else {
      console.error("Music card does not have a data-videoid attribute");
    }
  });
};
