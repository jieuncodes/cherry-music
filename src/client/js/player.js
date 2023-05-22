import {
  paintPlayerScreen,
  playerScreenPlayBtn,
  updateProgressBar,
} from "./playerScreen.js";
import { paintTitleWithMarquee } from "./util/marquee.js";

export let player;
let isVideoPlaying = false;

const musicCards = document.querySelectorAll("#music-card");
export const playerBox = document.getElementById("player-box");
export const playerBoxPlayBtn = playerBox.querySelector(".play-btn");
export const playerBoxNextBtn = playerBox.querySelector(".next-btn");
export const timeline = document.getElementById("timeline");

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
    } else {
      console.error("Player element not found in the DOM");
    }
  };
});

// player commands
export function togglePlayPauseBtn() {
  console.log("click playbtn");
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
    console.log("currTrackIndex", currentTrackIndex);
    paintPlayerWithTrackInfo();
    paintPlayerScreen();
    player.loadVideoById(nextTrack.videoId);
  } else {
    console.log("End of playlist reached");
  }
  updateNextButtonStatus();
}

function handleTimeLineChange(event) {
  const {
    target: { value },
  } = event;
  if (player && player.getDuration) {
    const videoDuration = player.getDuration();
    const seekToSeconds = (value / 100) * videoDuration;
    player.seekTo(seekToSeconds, true);
  } else {
    console.error("Player is not ready");
  }
}

function handleTimeLineMouseDown() {
  isVideoPlaying = player.getPlayerState() === YT.PlayerState.PLAYING;
  if (isVideoPlaying) {
    player.pauseVideo();
    playerBoxPlayBtn.childNodes[0].classList.replace("fa-pause", "fa-play");
    playerScreenPlayBtn.childNodes[0].classList.replace("fa-pause", "fa-play");
  }
}

function handleTimeLineMouseUp() {
  if (isVideoPlaying) {
    player.playVideo();
    playerBoxPlayBtn.childNodes[0].classList.replace("fa-play", "fa-pause");
    playerScreenPlayBtn.childNodes[0].classList.replace("fa-play", "fa-pause");
  }
}

// painters
const paintPlayerWithTrackInfo = () => {
  togglePlayPauseBtn();

  const track = clientPlayList[currentTrackIndex];
  const albumImgArea = playerBox.querySelector(".album-cover");
  const trackTitleArea = playerBox.querySelector(".track-title-area");
  const artistArea = playerBox.querySelector(".artist");

  albumImgArea.style.backgroundImage = `url(${track.albumImageUrl})`;
  artistArea.textContent = track.artist;

  trackTitleArea.innerHTML = "";
  console.log("track", track.title);
  trackTitleArea.innerHTML = paintTitleWithMarquee(track.title);
};

const updateNextButtonStatus = () => {
  if (
    clientPlayList.length <= 1 ||
    currentTrackIndex == clientPlayList.length - 1
  ) {
    playerBoxNextBtn.disabled = true;
  } else {
    playerBoxNextBtn.disabled = false;
  }
};

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

  if (event.data === YT.PlayerState.PLAYING) {
    playerBoxPlayBtn.disabled = false;
    playerBoxPlayBtn.childNodes[0].classList.replace("fa-play", "fa-pause");
    playerScreenPlayBtn.childNodes[0].classList.replace("fa-play", "fa-pause");
    playerScreenPlayBtn.childNodes[0].style.fontSize = "4rem";
  } else if (event.data === YT.PlayerState.PAUSED) {
    playerBoxPlayBtn.childNodes[0].classList.replace("fa-pause", "fa-play");
    playerScreenPlayBtn.childNodes[0].classList.replace("fa-pause", "fa-play");
  } else if (event.data === YT.PlayerState.ENDED) {
    handleNextBtnClick();
  }
};

//eventListeners
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

timeline.addEventListener("input", handleTimeLineChange);
timeline.addEventListener("mousedown", handleTimeLineMouseDown);
timeline.addEventListener("mouseup", handleTimeLineMouseUp);
