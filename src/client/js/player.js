import { addMusicToQueue } from "./controllers/queue.js";
import { hideLoadingScreen } from "./loading.js";
import {
  paintPlayerWithTrackInfo,
  paintToPauseBtn,
  paintToPlayBtn,
  updateNextButtonStatus,
  updatePrevButtonStatus,
} from "./painters.js";
import { paintPlayerScreen, updateProgressBar } from "./playerScreen.js";
import { paintCurrentPlaying } from "./playerScreenNav.js";

export let player;

const musicCards = document.querySelectorAll("#music-card");
export const playerBox = document.getElementById("player-box");
export const playerBoxPlayBtn = playerBox.querySelector(".play-btn");
export const playerBoxNextBtn = playerBox.querySelector(".next-btn");

export let clientPlayList = [];
export let currentTrackState = {
  index: 0,
};

export let playerReadyPromise = new Promise((resolve) => {
  window.onYouTubeIframeAPIReady = () => {
    const playerElement = document.getElementById("youtube-player");
    if (playerElement) {
      player = new YT.Player(playerElement, {
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

// player commands
export function togglePlayPauseBtn() {
  if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

export function handleNextBtnClick() {
  if (currentTrackState.index < clientPlayList.length - 1) {
    currentTrackState.index++;
    const nextTrack = clientPlayList[currentTrackState.index];
    paintPlayerWithTrackInfo();
    paintPlayerScreen();
    player.loadVideoById(nextTrack.videoId);
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
  player.loadVideoById(clientPlayList[currentTrackState.index].videoId);
}

const onMusicCardClick = ({ videoId, title, artist, albumImageUrl }) => {
  if (player) {
    addMusicToQueue({ videoId, title, artist, albumImageUrl });
  } else {
    console.error("Player has not been initialized yet");
  }
};

// iframe
const onPlayerStateChange = (event) => {
  console.log("playerstate", event.data);
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

musicCards.forEach((musicCard) => {
  const videoId = musicCard.dataset.videoid;
  const title = musicCard.dataset.title;
  const artist = musicCard.dataset.artist;
  const albumImageUrl = musicCard.dataset.albumimageurl;

  if (videoId) {
    musicCard.addEventListener("click", () =>
      onMusicCardClick({ videoId, title, artist, albumImageUrl })
    );
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
