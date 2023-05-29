import { timeline } from "./controllers/timeline.js";
import { playerReadyPromise, setState, state } from "./main.js";
import {
  handleNextBtnClick,
  handlePrevBtnClick,
  togglePlayPauseBtn,
} from "./player.js";
import { formatTime } from "./util/formatTime.js";
import { paintTitleWithMarquee } from "./util/marquee.js";

const playerBox = document.getElementById("player-box");
const playerScreen = document.getElementById("player-screen");
const chevron = document.querySelector(".fa-chevron-down");
export const playerScreenPrevBtn = document.querySelector(".prev-btn");
export const playerScreenNextBtn = playerScreen.querySelector(".next-btn");
export const playerScreenPlayBtn = playerScreen.querySelector(".play-btn");
export const checkBox = document.querySelector("#check_box");

const suffleBtn = document.querySelector(".shuffle");
const repeatBtn = document.querySelector(".repeat-btn");
const prevBtn = document.querySelector(".prev-btn");

export const paintPlayerScreen = () => {
  const { videoId, title, artist, albumImageUrl } =
    state.clientPlaylist[state.currQueueIndex];
  const albumCoverArea = playerScreen.querySelector(".album-img");
  const titleArea = playerScreen.querySelector(".track-title-area");
  const artistArea = playerScreen.querySelector(".artist");

  albumCoverArea.src = albumImageUrl;
  titleArea.innerHTML = paintTitleWithMarquee(title);
  artistArea.innerHTML = artist;
};

export const updateProgressBar = async () => {
  await playerReadyPromise;

  if (!state.iframePlayer) {
    return;
  }

  const currentTime = state.iframePlayer.getCurrentTime();
  const duration = state.iframePlayer.getDuration();

  const progress = (currentTime / duration) * 100;

  timeline.value = `${progress}`;

  const currentTimeDisplay = document.querySelector(".current-time");
  const durationDisplay = document.querySelector(".duration");

  currentTimeDisplay.textContent = formatTime(currentTime);
  durationDisplay.textContent = formatTime(duration);
};

const hidePlayerBox = (event) => {
  playerBox.style.transition = "bottom 0.3s ease-out";

  if (event.target.checked) {
    document.querySelector("#player-box").style.bottom = "-100%";
  } else {
    document.querySelector("#player-box").style.bottom = "0";
  }
};

//player commands
export let isShuffleOn = false;
export let isRepeatOn = false;

export const handleShuffleBtnClick = () => {
  console.log("shuffle");
  isShuffleOn = !isShuffleOn;
  if (isShuffleOn) {
    const shuffledPlaylist = state.clientPlaylist.sort(
      () => Math.random() - 0.5
    );
    setState({ clientPlaylist: shuffledPlaylist });
  }
};

export const handleRepeatBtnClick = () => {
  isRepeatOn = !isRepeatOn;
  if (isRepeatOn) {
    repeatBtn.style.color = "rgba(216, 35, 65, 0.78)";
  } else {
    repeatBtn.style.color = "inherit";
  }
};

suffleBtn.addEventListener("click", handleShuffleBtnClick);
repeatBtn.addEventListener("click", handleRepeatBtnClick);
prevBtn.addEventListener("click", handlePrevBtnClick);
checkBox.addEventListener("change", hidePlayerBox);

chevron.addEventListener("click", () => {
  playerScreen.classList.remove("active");
});
playerScreenPlayBtn.addEventListener("click", togglePlayPauseBtn);
playerScreenNextBtn.addEventListener("click", handleNextBtnClick);
playerScreenPrevBtn.addEventListener("click", handlePrevBtnClick);

playerBox.addEventListener("click", (event) => {
  if (
    event.target.tagName === "I" ||
    event.target.parentNode.className === "play-btn" ||
    event.target.parentNode.className === "pause-btn"
  ) {
    return;
  }
  playerScreen.classList.add("active");
});
