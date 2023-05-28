import { addMusicToQueue } from "./controllers/queue.js";
import { iframe } from "./main.js";
import {
  paintPlayerWithTrackInfo,
  updateNextButtonStatus,
  updatePrevButtonStatus,
} from "./painters.js";
import { paintPlayerScreen } from "./playerScreen.js";

console.log("Script loaded");

const musicCards = document.querySelectorAll("#music-card");
export const playerBox = document.getElementById("player-box");
export const playerBoxPlayBtn = playerBox.querySelector(".play-btn");
export const playerBoxNextBtn = playerBox.querySelector(".next-btn");

export let clientPlayList = [];
export let currentTrackState = {
  index: 0,
};

// player commands
export function togglePlayPauseBtn() {
  if (
    iframe.player &&
    iframe.player.getPlayerState() === YT.PlayerState.PLAYING
  ) {
    iframe.player.pauseVideo();
  } else if (
    iframe.player &&
    iframe.player.getPlayerState() !== YT.PlayerState.PLAYING
  ) {
    iframe.player.playVideo();
  }
}

export function handleNextBtnClick() {
  if (currentTrackState.index < clientPlayList.length - 1) {
    currentTrackState.index++;
    const nextTrack = clientPlayList[currentTrackState.index];
    paintPlayerWithTrackInfo();
    paintPlayerScreen();
    iframe.player.loadVideoById(nextTrack.videoId);
  } else {
    console.log("End of playlist reached");
  }
  updateNextButtonStatus();
  updatePrevButtonStatus();
}
export function handlePrevBtnClick() {
  if (currentTrackState.index > 0) {
    currentTrackState.index--;
  } else {
    if (prevBtn) {
      prevBtn.disabled = true;
    }
    currentTrackState.index = clientPlayList.length - 1;
  }

  paintPlayerWithTrackInfo();
  paintPlayerScreen();
  updateNextButtonStatus();
  updatePrevButtonStatus();
  iframe.player.loadVideoById(clientPlayList[currentTrackState.index].videoId);
}
const onMusicCardClick = ({ videoId, title, artist, albumImageUrl }) => {
  if (iframe.player) {
    addMusicToQueue({ videoId, title, artist, albumImageUrl });
  } else {
    console.log("clicked music title", title);
    console.error("Player has not been initialized yet");
  }
};

musicCards.forEach((musicCard) => {
  const videoId = musicCard.dataset.videoid;
  const title = musicCard.dataset.title;
  const artist = musicCard.dataset.artist;
  const albumImageUrl = musicCard.dataset.albumimageurl;

  if (videoId) {
    musicCard.addEventListener("click", (event) => {
      onMusicCardClick({ videoId, title, artist, albumImageUrl });
    });
  } else {
    console.error("Music card does not have a data-videoid attribute");
  }
});

playerBoxPlayBtn.addEventListener("click", togglePlayPauseBtn);
playerBoxNextBtn.addEventListener("click", handleNextBtnClick);
document.addEventListener("DOMContentLoaded", () => {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
});
