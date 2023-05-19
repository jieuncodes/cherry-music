import {
  clientPlayList,
  currentTrackIndex,
  handleNextBtnClick,
  player,
  playerReadyPromise,
  timeline,
  togglePlayPauseBtn,
} from "./player.js";
import { formatTime } from "./util/formatTime.js";

const playerBox = document.getElementById("player-box");
const playerScreen = document.getElementById("player-screen");
const chevron = document.querySelector(".fa-chevron-down");
export const playerScreenNextBtn = playerScreen.querySelector(".next-btn");
export const playerScreenPlayBtn = playerScreen.querySelector(".play-btn");

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

export const updateProgressBar = async () => {
  await playerReadyPromise;

  if (!player) {
    return;
  }

  const currentTime = player.getCurrentTime();
  const duration = player.getDuration();

  const progress = (currentTime / duration) * 100;

  timeline.value = `${progress}`;

  const currentTimeDisplay = document.querySelector(".current-time");
  const durationDisplay = document.querySelector(".duration");

  currentTimeDisplay.textContent = formatTime(currentTime);
  durationDisplay.textContent = formatTime(duration);
};
chevron.addEventListener("click", () => {
  playerScreen.classList.remove("active");
});

playerScreenPlayBtn.addEventListener("click", togglePlayPauseBtn);
playerScreenNextBtn.addEventListener("click", handleNextBtnClick);

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
