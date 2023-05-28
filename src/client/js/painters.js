import { state } from "./main.js";
import {
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

export const replaceClassForButton = (button, oldClass, newClass) => {
  button.childNodes[0].classList.replace(oldClass, newClass);
};

export const paintToPauseBtn = () => {
  replaceClassForButton(playerBoxPlayBtn, "fa-play", "fa-pause");
  replaceClassForButton(playerScreenPlayBtn, "fa-play", "fa-pause");
  playerScreenPlayBtn.childNodes[0].style.fontSize = "4rem";
};

export const paintToPlayBtn = () => {
  replaceClassForButton(playerBoxPlayBtn, "fa-pause", "fa-play");
  replaceClassForButton(playerScreenPlayBtn, "fa-pause", "fa-play");
};

export const paintPlayerWithTrackInfo = () => {
  togglePlayPauseBtn();

  const track = state.client.playlist[state.currQueue.index];
  const albumImgArea = playerBox.querySelector(".album-cover");
  const trackTitleArea = playerBox.querySelector(".track-title-area");
  const artistArea = playerBox.querySelector(".artist");

  albumImgArea.style.backgroundImage = `url(${track.albumImageUrl})`;
  artistArea.textContent = track.artist;

  trackTitleArea.innerHTML = paintTitleWithMarquee(track.title);
};

const disableButtonConditionally = (button, deadEnd) => {
  if (deadEnd) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
};

export const updateNextButtonStatus = () => {
  console.log("state.client.playlist", state.client.playlist);
  const deadEnd =
    state.client.playlist.length <= 1 ||
    state.currQueue.index === state.client.playlist.length - 1;
  disableButtonConditionally(playerBoxNextBtn, deadEnd);
  disableButtonConditionally(playerScreenNextBtn, deadEnd);
};

export const updatePrevButtonStatus = () => {
  const deadEnd = state.currQueue.index === 0;
  disableButtonConditionally(playerScreenPrevBtn, deadEnd);
};
