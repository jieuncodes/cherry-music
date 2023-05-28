import { stopAndPlayFirst } from "./controllers/queue.js";
import { state } from "./main.js";

export const playAllBtn = document.querySelector(".play-page-list");
export const currListTracks = document.querySelectorAll("#music-card");

document.addEventListener("DOMContentLoaded", function () {
  const addAllListTracksInQueue = async () => {
    state.currentTrackState.index = 0;

    const allPlaylistTracks = [];
    currListTracks.forEach((track) => {
      const {
        videoid: videoId,
        title,
        artist,
        albumimageurl: albumImageUrl,
      } = track.dataset;
      allPlaylistTracks.push({ videoId, title, artist, albumImageUrl });
    });

    state.client.playlist = [...allPlaylistTracks, ...state.client.playlist];
    stopAndPlayFirst();
  };

  playAllBtn.addEventListener("click", addAllListTracksInQueue);
});
