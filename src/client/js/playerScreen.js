import { clientPlayList, currentTrackIndex } from "./player.js";

const playerBox = document.getElementById("player-box");
const playerScreen = document.getElementById("player-screen");
const chevron = document.querySelector(".fa-chevron-down");
const playButton = playerBox.querySelector(".play-btn");
const nextButton = playerBox.querySelector(".next-btn");

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

const isClickOnControl = (event, control) =>
  event.target === control || event.target.parentNode === control;

playerBox.addEventListener("click", (event) => {
  if (
    isClickOnControl(event, playButton) ||
    isClickOnControl(event, nextButton)
  ) {
    return;
  }
  playerScreen.classList.add("active");
});

chevron.addEventListener("click", () => {
  playerScreen.classList.remove("active");
});
