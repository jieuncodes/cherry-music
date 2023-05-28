import "../scss/styles.scss";
import { hideLoadingScreen } from "./loading.js";
import {
  paintMainScreenBg,
  paintToPauseBtn,
  paintToPlayBtn,
} from "./painters.js";
import {
  bindMusicCardEvents,
  handleNextBtnClick,
  playerBoxPlayBtn,
  togglePlayPauseBtn,
} from "./player.js";
import { updateProgressBar } from "./playerScreen.js";
import { paintCurrentPlaying } from "./playerScreenNav.js";

export let state = {
  client: {
    playlist: [],
  },
  currentTrackState: {
    index: 0,
  },
};

//iframe
export let iframe = {
  player: null,
};

export let playerReadyPromise = new Promise((resolve) => {
  window.onYouTubeIframeAPIReady = () => {
    const playerElement = document.getElementById("youtube-player");
    if (playerElement) {
      iframe.player = new YT.Player(playerElement, {
        videoId: "",
        events: {
          onReady: (event) => {
            event.target.playVideo();
            togglePlayPauseBtn();
            resolve();
          },
          onStateChange: onPlayerStateChange,
        },
      });
      setInterval(updateProgressBar, 100);
      hideLoadingScreen();
    } else {
      console.error("Player element not found in the DOM");
    }
  };
});

export const onPlayerStateChange = (event) => {
  paintCurrentPlaying();

  if (event.data === YT.PlayerState.PLAYING) {
    playerBoxPlayBtn.disabled = false;
    paintToPauseBtn();
  } else if (event.data === YT.PlayerState.PAUSED) {
    paintToPlayBtn();
  } else if (event.data === YT.PlayerState.ENDED) {
    handleNextBtnClick();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
  bindMusicCardEvents();
});

window.addEventListener("scroll", paintMainScreenBg);
