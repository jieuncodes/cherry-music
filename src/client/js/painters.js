import {
  clientPlayList,
  currentTrackIndex,
  playerBox,
  playerBoxNextBtn,
  playerBoxPlayBtn,
  togglePlayPauseBtn,
} from "./player.js";
import { playerScreenNextBtn, playerScreenPlayBtn, playerScreenPrevBtn } from "./playerScreen.js";
import { paintTitleWithMarquee } from "./util/marquee.js";

export const paintToPauseBtn = () => {
  playerBoxPlayBtn.childNodes[0].classList.replace("fa-play", "fa-pause");
  playerScreenPlayBtn.childNodes[0].classList.replace("fa-play", "fa-pause");
  playerScreenPlayBtn.childNodes[0].style.fontSize = "4rem";
};

export const paintToPlayBtn = () => {
  playerBoxPlayBtn.childNodes[0].classList.replace("fa-pause", "fa-play");
  playerScreenPlayBtn.childNodes[0].classList.replace("fa-pause", "fa-play");
};

export const paintPlayerWithTrackInfo = () => {
  togglePlayPauseBtn();

  const track = clientPlayList[currentTrackIndex];
  const albumImgArea = playerBox.querySelector(".album-cover");
  const trackTitleArea = playerBox.querySelector(".track-title-area");
  const artistArea = playerBox.querySelector(".artist");

  albumImgArea.style.backgroundImage = `url(${track.albumImageUrl})`;
  artistArea.textContent = track.artist;

  trackTitleArea.innerHTML = "";
  trackTitleArea.innerHTML = paintTitleWithMarquee(track.title);
};

export const updateNextButtonStatus = () => {
  if (
    clientPlayList.length <= 1 ||
    currentTrackIndex == clientPlayList.length - 1
  ) {
    playerBoxNextBtn.disabled = true;
    playerScreenNextBtn.disabled = true;
  } else {
    playerBoxNextBtn.disabled = false;
    playerScreenNextBtn.disabled = false;
  }
};

export const updatePrevButtonStatus = () => {
  if (currentTrackIndex == 0) {
    playerScreenPrevBtn.disabled = true;
  } else {
    playerScreenPrevBtn.disabled = false;
  }
};
