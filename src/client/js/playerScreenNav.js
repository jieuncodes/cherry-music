import { playerReadyPromise, state } from "./main.js";

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
    mountPlayListTracks();
  }
  event.target.classList.add("clicked");
};

export const paintCurrentPlaying = async () => {
  await playerReadyPromise;
  const currentPlayingIndex = state.currentTrackState.index;
  const listMusicCards = document.querySelectorAll(".playlist-music-card");

  if (listMusicCards) {
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

const mountPlayListTracks = () => {
  navBody.innerHTML = "";
  if (state.client.playlist.length == 0) {
    const emptyPlayListMsg = document.createElement("div");
    const msg = document.createElement("span");
    msg.innerHTML = "재생목록에 곡을 추가해주세요.";
    emptyPlayListMsg.classList.add("empty-playlist-div");
    emptyPlayListMsg.appendChild(msg);
    navBody.appendChild(emptyPlayListMsg);
    return;
  }
  const musicCardsContainer = document.createElement("div");
  musicCardsContainer.classList.add("music-cards-container");

  state.client.playlist.forEach((track, index) => {
    let musicCard = document.createElement("div");
    musicCard.id = "music-card";
    musicCard.classList.add("playlist-music-card");
    musicCard.dataset.videoid = track.videoId;
    musicCard.dataset.title = track.title;
    musicCard.dataset.artist = track.artist;
    musicCard.dataset.albumimageurl = track.albumImageUrl;

    let albumCover = document.createElement("div");
    albumCover.classList.add("album-cover");
    albumCover.style.backgroundImage = `url(${track.albumImageUrl})`;

    let titleArea = document.createElement("div");
    titleArea.classList.add("track-title-area");

    let trackTitle = document.createElement("div");
    trackTitle.classList.add("track-title");
    trackTitle.textContent = track.title;
    titleArea.appendChild(trackTitle);

    let artist = document.createElement("div");
    artist.classList.add("artist");
    artist.textContent = track.artist;

    let playBtn = document.createElement("button");
    playBtn.classList.add("play-btn");

    let icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-ellipsis-vertical");
    playBtn.appendChild(icon);

    musicCard.appendChild(albumCover);
    musicCard.appendChild(titleArea);
    musicCard.appendChild(artist);
    musicCard.appendChild(playBtn);

    musicCardsContainer.appendChild(musicCard);
  });
  navBody.appendChild(musicCardsContainer);
  paintCurrentPlaying();
};

handle.addEventListener("click", pullUpNav);

buttons.forEach((button) => {
  button.addEventListener("click", handleNavBtnClick);
});
