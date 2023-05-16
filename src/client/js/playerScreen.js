import {
  clientPlayList,
  currentTrackIndex,
  player,
  togglePlayPause,
} from "./player.js";
import { formatTime } from "./util/formatTime.js";

const playerBox = document.getElementById("player-box");
const playerScreen = document.getElementById("player-screen");
const chevron = document.querySelector(".fa-chevron-down");
const progressBar = document.querySelector(".progress-bar");
const progressBarHandle = document.querySelector(".progress-bar-handle");

const playerScreenPlayBtn = playerScreen.querySelector(".play-btn");

export const paintPlayerScreen = () => {
  const { videoId, title, artist, albumImageUrl } =
    clientPlayList[currentTrackIndex];
  const albumCoverArea = playerScreen.querySelector(".album-img");
  const titleArea = playerScreen.querySelector(".title");
  const artistArea = playerScreen.querySelector(".artist");

  albumCoverArea.src = albumImageUrl;
  titleArea.innerHTML = title;
  artistArea.innerHTML = artist;
};

export const updateProgressBar = () => {
  if (!player) {
    return;
  }
  console.log("update");
  const currentTime = player.getCurrentTime();
  const duration = player.getDuration();

  const progress = (currentTime / duration) * 100;

  progressBar.style.width = `${progress}%`;
  console.log("", progressBar.offsetWidth);
  const translateXValue = (progressBar.offsetWidth / 100) * progress;

  progressBarHandle.style.transform = `translateX(${translateXValue}px)`;

  const currentTimeDisplay = document.querySelector(".current-time");
  const durationDisplay = document.querySelector(".duration");

  currentTimeDisplay.textContent = formatTime(currentTime);
  durationDisplay.textContent = formatTime(duration);
};

chevron.addEventListener("click", () => {
  playerScreen.classList.remove("active");
});

playerScreenPlayBtn.addEventListener("click", togglePlayPause);

playerBox.addEventListener("click", (event) => {
  console.log("", event.target);
  if (
    event.target.tagName === "I" ||
    event.target.parentNode.className === "play-btn" ||
    event.target.parentNode.className === "pause-btn"
  ) {
    return;
  }
  playerScreen.classList.add("active");
});

let isDragging = false;

progressBarHandle.addEventListener("mousedown", (event) => {
  isDragging = true;
  console.log("donw");
});

document.addEventListener("mousemove", (event) => {
  if (!isDragging) return;

  const progressBarRect = progressBar.getBoundingClientRect();
  console.log("", progressBarRect);
  const newTime =
    ((event.clientX - progressBarRect.left) / progressBarRect.width) *
    player.getDuration();

  player.seekTo(newTime);
  updateProgressBar();
});

document.addEventListener("mouseup", (event) => {
  console.log("Mouse Up");

  isDragging = false;
});
