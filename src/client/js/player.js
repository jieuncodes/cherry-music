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

export const isPlayerPlaying = () =>
  iframe.player && iframe.player.getPlayerState() === YT.PlayerState.PLAYING;

export function togglePlayPauseBtn() {
  return isPlayerPlaying()
    ? iframe.player.pauseVideo()
    : iframe.player.playVideo();
}

export const updateTrackIndex = (direction) => {
  if (
    direction === "next" &&
    currentTrackState.index < clientPlayList.length - 1
  ) {
    currentTrackState.index++;
  } else if (direction === "prev" && currentTrackState.index > 0) {
    currentTrackState.index--;
  }
};

export function handleNextBtnClick() {
  updateTrackIndex("next");
  const nextTrack = clientPlayList[currentTrackState.index];
  paintPlayerWithTrackInfo();
  paintPlayerScreen();
  iframe.player.loadVideoById(nextTrack.videoId);
  updateNextButtonStatus();
  updatePrevButtonStatus();
}

export function handlePrevBtnClick() {
  updateTrackIndex("prev");
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

export const bindMusicCardEvents = () => {
  musicCards.forEach((musicCard) => {
    const {
      videoid: videoId,
      title,
      artist,
      albumimageurl: albumImageUrl,
    } = musicCard.dataset;

    if (videoId) {
      musicCard.addEventListener("click", () =>
        onMusicCardClick({ videoId, title, artist, albumImageUrl })
      );
    } else {
      console.error("Music card does not have a data-videoid attribute");
    }
  });
};

playerBoxPlayBtn.addEventListener("click", togglePlayPauseBtn);
playerBoxNextBtn.addEventListener("click", handleNextBtnClick);
