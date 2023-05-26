import {
  clientPlayList,
  currentTrackIndex,
  playerReadyPromise,
} from "./player.js";
import { mountPlayListTracks } from "./trackPainters.js";

const navArea = document.querySelector(".player-screen__nav");
const handle = navArea.querySelector(".handle-bar");
const buttons = navArea.querySelectorAll("button");
const navBody = document.querySelector(".nav__body");

const pullUpNav = (event) => {
  if (event.target !== handle) return;
  navArea.classList.add("nav-active");
  const playerBox = document.getElementById("player-box");
  playerBox.classList.add("top-player");
  buttons[0].click();
  handle.removeEventListener("click", pullUpNav);
  handle.addEventListener("click", pushDownNav);
};
const pushDownNav = (event) => {
  if (event.target !== handle) return;
  navArea.classList.remove("nav-active");

  const playerBox = document.getElementById("player-box");
  playerBox.classList.remove("top-player");

  handle.removeEventListener("click", pushDownNav);
  handle.addEventListener("click", pullUpNav);
};

const handleNavBtnClick = (event) => {
  if (event.target.parentNode.classList[0] !== "nav-items") return;

  buttons.forEach((button) => {
    button.classList.remove("clicked");
  });
  if (event.target.classList.value == "next-track") {
    navBody.innerHTML = "";
    if (clientPlayList.length == 0) {
      const emptyPlayListMsg = document.createElement("div");
      const msg = document.createElement("span");
      msg.innerHTML = "재생목록에 곡을 추가해주세요.";
      emptyPlayListMsg.classList.add("empty-playlist-div");
      emptyPlayListMsg.appendChild(msg);
      navBody.appendChild(emptyPlayListMsg);
      return;
    }
    const musicCardsContainer = mountPlayListTracks(clientPlayList);
    navBody.appendChild(musicCardsContainer);

    paintCurrentPlaying();
  }
  event.target.classList.add("clicked");
};

export const paintCurrentPlaying = async () => {
  await playerReadyPromise;
  const currentPlayingIndex = currentTrackIndex;
  const listMusicCards = document.querySelectorAll(".playlist-music-card");

  if (listMusicCards) {
    console.log("listMusiccards exists");
    listMusicCards.forEach((card, index) => {
      if (index == currentPlayingIndex) {
        card.style.backgroundColor = "#1c1c1cb0";
        card.style.padding = "3rem 1.5rem 5rem 1.5rem";
      } else {
        card.style.backgroundColor = "transparent";
        card.style.padding = "2rem 1.5rem 4rem 1.5rem";
      }
    });
  } else {
    console.log("No playing card found at index", currentPlayingIndex);
  }
};

handle.addEventListener("click", pullUpNav);

buttons.forEach((button) => {
  button.addEventListener("click", handleNavBtnClick);
});
