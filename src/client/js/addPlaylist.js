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
  searchModalBody.innerHTML = "";
  data.searchedTracks.forEach((track) => {
    const div = document.createElement("div");
    div.classList.add("search-item");
    div.innerHTML = `
      <div class="search-item__info">
        <div class="info__title">${track.trackTitle}</div>
        <div class="info__artist">${track.artist}</div>
      </div>
      <div class="search-item__add">
        <i class="fas fa-plus"></i>
      </div>
    `;
    searchModalBody.appendChild(div);
  });
};


addCoverBox.addEventListener("click", clickUploadInput);
addTrackBtn.addEventListener("click", openSearchModal);
searchModalInput.addEventListener("submit", searchTracks);
