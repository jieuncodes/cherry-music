import {
  clientPlayList,
  currentTrackState,
  togglePlayPauseBtn,
} from "./player.js";

console.log("pl");

const playAllBtn = document.querySelector(".play-page-list");
console.log("");
const allListTracks = document.querySelectorAll("#music-card");

const addAllListTracksInQueue = () => {
  currentTrackState.index = 0;

  allListTracks.forEach((track) => {
    const {
      videoid: videoId,
      title,
      artist,
      albumimageurl: albumImageUrl,
    } = track.dataset;

    clientPlayList.unshift({ videoId, title, artist, albumImageUrl });
    console.log("cli", clientPlayList);
  });

  togglePlayPauseBtn();
};

playAllBtn.addEventListener("click", addAllListTracksInQueue);
