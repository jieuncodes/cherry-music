import { fetchSearchData } from "../../api/searchApi.js";

const addCoverBox = document.querySelector(".add-cover-box");
const addTrackBtn = document.querySelector("button.add-track");
const searchModal = document.querySelector(".search-modal");
const searchModalInput = document.querySelector(".search-input.modal");
const addPlaylistForm = document.querySelector(".submit-form");
const coverInput = document.getElementById("playlist_cover_input");

//cover img upload
const clickUploadInput = (event) => {
  event.stopPropagation();
  coverInput.click();
};

const showUploadedImgOnScreen = (event) => {
  if (event.target.files && event.target.files[0]) {
    const fileReader = new FileReader();

    fileReader.onload = function (event) {
      if (addCoverBox.lastElementChild) {
        addCoverBox.lastElementChild.remove();
      }
      addCoverBox.style.backgroundImage = `url('${event.target.result}')`;
      addCoverBox.style.backgroundSize = "cover";
      addCoverBox.style.backgroundRepeat = "no-repeat";
    };

    fileReader.readAsDataURL(event.target.files[0]);
  }
};

//cart
let addPlaylistCart = [];

const displayAddedCartOnScreen = () => {
  const submitButton = document.querySelector(".submit-btn");
  const oldCart = document.querySelector(".cart");
  if (oldCart) oldCart.remove();

  const cart = document.createElement("div");
  cart.className = "cart";

  addPlaylistCart.forEach((track, index) => {
    const musicCard = paintMusicCard(track);
    musicCard.removeEventListener("click", addToCart);

    const minusBtn = document.createElement("button");
    minusBtn.classList.add("remove-btn");
    const minusIcon = document.createElement("i");
    minusIcon.classList.add("fa-solid");
    minusIcon.classList.add("fa-minus");
    minusBtn.appendChild(minusIcon);
    musicCard.appendChild(minusBtn);
    minusBtn.addEventListener("click", () => removeFromCart(index));
    musicCard.appendChild(minusBtn);

    cart.appendChild(musicCard);
  });

  addPlaylistForm.insertBefore(cart, submitButton);
};

const removeFromCart = (index) => {
  addPlaylistCart.splice(index, 1);
  displayAddedCartOnScreen();
};

export const addToCart = (event) => {
  console.log(" event.currentTarget.dataset", event.currentTarget.dataset);
  const { videoid, title, artist, albumimageurl } = event.currentTarget.dataset;
  addPlaylistCart.push({
    videoId: videoid,
    trackTitle: title,
    artist,
    albumImageUrl: albumimageurl,
  });
  hideSearchModal();
  displayAddedCartOnScreen();
  console.log("cart", addPlaylistCart);
};

//search modal
const openSearchModal = (event) => {
  event.stopPropagation();
  console.log("add");
  searchModal.classList.remove("hidden");
  window.addEventListener("click", hideSearchModal);
};

const hideSearchModal = (event) => {
  console.log("hide Modal");
  if (event && !searchModal.contains(event.target)) {
    searchModal.classList.add("hidden");
    window.removeEventListener("click", hideSearchModal);
  } else if (!event) {
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

export const paintMusicCard = (track) => {
  console.log("track", track);
  const musicCard = document.createElement("div");
  musicCard.classList.add("playlist-music-card");
  musicCard.id = "music-card";
  musicCard.setAttribute("data-videoid", track.youtubeVideoId);
  musicCard.setAttribute("data-title", track.trackTitle);
  musicCard.setAttribute("data-artist", track.artist);
  musicCard.setAttribute("data-albumimageurl", track.albumImageUrl);
  console.log("musicCard", musicCard);
  musicCard.innerHTML = `
        <div class="album-cover" style="background-image: url(${track.albumImageUrl})"></div>
        <div class="track-title-area">
          <div class="track-title">${track.trackTitle}</div>
        </div>
        <div class="artist">${track.artist}</div>
    `;
  musicCard.addEventListener("click", addToCart);
  return musicCard;
};

const paintModalBody = (data) => {
  const searchModalBody = document.querySelector(".search-modal__body");
  searchModalBody.innerHTML = "";

  if (data.searchedTracks.length == 0) {
    const emptyResultMsg = document.createElement("div");
    emptyResultMsg.classList.add("empty-res-msg");
    emptyResultMsg.innerHTML = "검색결과가 없습니다.";
    searchModalBody.appendChild(emptyResultMsg);
    return;
  }
  const musicCardsContainer = document.createElement("div");
  musicCardsContainer.classList.add("music-cards-container");

  data.searchedTracks.forEach((track) => {
    const musicCard = paintMusicCard(track);

    const plusBtn = document.createElement("button");
    plusBtn.classList.add("add-btn");
    const plusIcon = document.createElement("i");
    plusIcon.classList.add("fa-solid");
    plusIcon.classList.add("fa-plus");
    plusBtn.appendChild(plusIcon);
    musicCard.appendChild(plusBtn);
    musicCardsContainer.appendChild(musicCard);
  });

  searchModalBody.appendChild(musicCardsContainer);
};

addCoverBox.addEventListener("click", clickUploadInput);
addTrackBtn.addEventListener("click", openSearchModal);
searchModalInput.addEventListener("submit", searchTracks);
coverInput.addEventListener("change", showUploadedImgOnScreen);
