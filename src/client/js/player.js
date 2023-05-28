import { hideLoadingScreen } from "./loading.js";
import { paintPlayerWithTrackInfo, paintToPauseBtn, paintToPlayBtn, updateNextButtonStatus, updatePrevButtonStatus } from "./painters.js";
import {
  paintPlayerScreen,
  updateProgressBar,
} from "./playerScreen.js";
import { paintCurrentPlaying } from "./playerScreenNav.js";

export let player;


const musicCards = document.querySelectorAll("#music-card");
export const playerBox = document.getElementById("player-box");
export const playerBoxPlayBtn = playerBox.querySelector(".play-btn");
export const playerBoxNextBtn = playerBox.querySelector(".next-btn");

export let clientPlayList = [];
export let currentTrackIndex = 0;

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
  if (currentTrackIndex < clientPlayList.length - 1) {
    currentTrackIndex++;
    const nextTrack = clientPlayList[currentTrackIndex];
    paintPlayerWithTrackInfo();
    paintPlayerScreen();
    player.loadVideoById(nextTrack.videoId);
  } else {
    console.log("End of playlist reached");
  }
  updateNextButtonStatus();
  updatePrevButtonStatus();
}
export function handlePrevBtnClick(){
  if (currentTrackIndex > 0) {
    currentTrackIndex--;
  } else {
    prevBtn.disabled = true;
    currentTrackIndex = clientPlayList.length - 1;
  }

  paintPlayerWithTrackInfo();
  paintPlayerScreen();

  player.loadVideoById(clientPlayList[currentTrackIndex].videoId);
};



// painters

// queue functions
const addMusicToQueue = async ({ videoId, title, artist, albumImageUrl }) => {
  clientPlayList.unshift({
    videoId,
    title,
    artist,
    albumImageUrl,
  });
  currentTrackIndex = 0;
  updateNextButtonStatus();
  updatePrevButtonStatus();

  if (player) {
    player.stopVideo();
    const firstTrack = clientPlayList[0];
    if (firstTrack) {
      paintPlayerWithTrackInfo();
      paintPlayerScreen();

      player.loadVideoById(firstTrack.videoId);
    }
  } else {
    console.error("Player has not been initialized yet");
  }
  paintCurrentPlaying();
};

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

