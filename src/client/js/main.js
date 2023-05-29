import "../scss/styles.scss";
import { stopAndPlayFirst } from "./controllers/queue.js";
import { hideLoadingScreen } from "./loading.js";
import {
  bindMusicCardEvents,
  paintMainScreenBg,
  paintToPauseBtn,
  paintToPlayBtn,
  updateNextButtonStatus,
} from "./painters.js";
import {
  handleNextBtnClick,
  playerBoxPlayBtn,
  togglePlayPauseBtn,
} from "./player.js";
import { updateProgressBar } from "./playerScreen.js";
import { paintCurrentPlaying } from "./playerScreenNav.js";

export const playAllBtn = document.querySelector(".play-page-list");

export let state = {
  clientPlaylist: [],
  currQueueIndex: 0,
  iframePlayer: null,
};

export const setState = (nextState) => {
  state = { ...state, ...nextState };
};

//iframe
export let playerReadyPromise = new Promise((resolve) => {
  window.onYouTubeIframeAPIReady = () => {
    const playerElement = document.getElementById("youtube-player");
    if (playerElement) {
      state.iframePlayer = new YT.Player(playerElement, {
        videoId: "",
        events: {
          onReady: (event) => {
            togglePlayPauseBtn();

            resolve();
          },
          onStateChange: onPlayerStateChange,
        },
      });
      setInterval(updateProgressBar, 100);
      hideLoadingScreen();
    } else {
      console.error("Player element not found in the DOM");
    }
  };
});

export const onPlayerStateChange = (event) => {
  paintCurrentPlaying();
  if (event.data === YT.PlayerState.PLAYING) {
    playerBoxPlayBtn.disabled = false;
    paintToPauseBtn();
  } else if (event.data === YT.PlayerState.PAUSED) {
    paintToPlayBtn();
  } else if (event.data === YT.PlayerState.ENDED) {
    handleNextBtnClick();
  }
};
export const insertIframeScript = () => {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
};

document.addEventListener("DOMContentLoaded", () => {
  insertIframeScript();
  bindMusicCardEvents();
});

window.addEventListener("scroll", paintMainScreenBg);

/*
 * Playlist controller - Currently, this code must reside in the same file due to an issue
 * with the timing of state initialization and the readiness of the YouTube Iframe API.
 * Separating this into a different module file caused state synchronization problems.
 */

const handlePlayAllBtnClick = async () => {
  const currListTracks = document.querySelectorAll("#music-card");

  state.currQueueIndex = 0;
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

  const newClientPlaylist = [...allPlaylistTracks, ...state.clientPlaylist];
  setState({ ...state, clientPlaylist: newClientPlaylist, currQueueIndex: 0 });

  updateNextButtonStatus();
  stopAndPlayFirst();
};

if (playAllBtn) {
  playAllBtn.addEventListener("click", handlePlayAllBtnClick);
}
