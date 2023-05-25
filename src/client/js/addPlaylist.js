import { fetchSearchData } from "../../api/searchApi.js";

const addCoverBox = document.querySelector(".add-cover-box");
const addTrackBtn = document.querySelector("button.add-track");
const searchModal = document.querySelector(".search-modal");
const searchModalInput = document.querySelector(".search-input.modal");

const openSearchModal = (event) => {
  event.stopPropagation();
  console.log("add");
  searchModal.classList.remove("hidden");
  window.addEventListener("click", hideSearchModal);
};

const hideSearchModal = (event) => {
  console.log("remove");
  if (!searchModal.contains(event.target)) {
    searchModal.classList.add("hidden");
    window.removeEventListener("click", hideSearchModal);
  }
};

const searchTracks = async (event) => {
  event.preventDefault();
  const keyword = event.target.elements.search.value;
  const res = await fetchSearchData(keyword);
  console.log("", typeof res);
  paintModalBody(res);
};

const clickUploadInput = (event) => {
  event.stopPropagation();
  document.getElementById("playlist_cover_input").click();
};

const paintModalBody = (data) => {
  const searchModalBody = document.querySelector(".search-modal__body");
  const musicCardsContainer = document.createElement("div");
  musicCardsContainer.classList.add("music-cards-container");
  searchModalBody.innerHTML = "";

  data.searchedTracks.forEach((track) => {
    const div = document.createElement("div");
    div.classList.add("playlist-music-card");
    div.id = "music-card";
    div.setAttribute("data-videoid", track.youtubeVideoId);
    div.setAttribute("data-title", track.trackTitle);
    div.setAttribute("data-artist", track.artist);
    div.setAttribute("data-albumimageurl", track.albumImageUrl);
    div.innerHTML = `
        <div class="album-cover" style="background-image: url(${track.albumImageUrl}"></div>
        <div class="track-title-area">
          <div class="track-title">${track.trackTitle}</div>
        </div>
        <div class="artist">${track.artist}</div>
        <button class="add-btn">
          <i class="fa-solid fa-plus"></i>
        </button>
    `;
    musicCardsContainer.appendChild(div);
  });
  searchModalBody.appendChild(musicCardsContainer);
};


addCoverBox.addEventListener("click", clickUploadInput);
addTrackBtn.addEventListener("click", openSearchModal);
searchModalInput.addEventListener("submit", searchTracks);
