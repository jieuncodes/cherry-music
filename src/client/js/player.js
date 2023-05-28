import { addMusicToQueue } from "./controllers/queue.js";
import { iframe, playerReadyPromise, state } from "./main.js";
import {
  paintPlayerWithTrackInfo,
  updateNextButtonStatus,
  updatePrevButtonStatus,
} from "./painters.js";
import { paintPlayerScreen } from "./playerScreen.js";

const musicCards = document.querySelectorAll("#music-card");
export const playerBox = document.getElementById("player-box");
export const playerBoxPlayBtn = playerBox.querySelector(".play-btn");
export const playerBoxNextBtn = playerBox.querySelector(".next-btn");

//todo: put the client pl in the localStroage
export const isPlayerPlaying = () =>
  state.iframe.player &&
  state.iframe.player.getPlayerState() === YT.PlayerState.PLAYING;

export async function togglePlayPauseBtn() {
  await playerReadyPromise;
  return isPlayerPlaying()
    ? state.iframe.player.pauseVideo()
    : state.iframe.player.playVideo();
}

export const updateTrackIndex = (direction) => {
  if (
    direction === "next" &&
    state.currQueue.index < state.client.playlist.length - 1
  ) {
    state.currQueue.index++;
  } else if (direction === "prev" && state.currQueue.index > 0) {
    state.currQueue.index--;
  }
};

export function handleNextBtnClick() {
  updateTrackIndex("next");
  const nextTrack = state.client.playlist[state.currQueue.index];
  paintPlayerWithTrackInfo();
  paintPlayerScreen();

  state.iframe.player.loadVideoById(nextTrack.videoId);
  updateNextButtonStatus();
  updatePrevButtonStatus();
}

export function handlePrevBtnClick() {
  updateTrackIndex("prev");
  paintPlayerWithTrackInfo();
  paintPlayerScreen();
  updateNextButtonStatus();
  updatePrevButtonStatus();

  state.iframe.player.loadVideoById(
    state.client.playlist[state.currQueue.index].videoId
  );
}

const onMusicCardClick = async ({ videoId, title, artist, albumImageUrl }) => {
  await playerReadyPromise;

  if (state.iframe.player) {
    addMusicToQueue({ videoId, title, artist, albumImageUrl });
  } else {
    console.error("Player has not been initialized yet");
  }
};

export const bindMusicCardEvents = () => {
  musicCards.forEach((musicCard) => {
    const {
      videoid: videoId,
      title,
      artist,
      albumimageurl: albumImageUrl,
    } = musicCard.dataset;

    if (videoId) {
      musicCard.addEventListener("click", () =>
        onMusicCardClick({ videoId, title, artist, albumImageUrl })
      );
    } else {
      console.error("Music card does not have a data-videoid attribute");
    }
  });
};

playerBoxPlayBtn.addEventListener("click", togglePlayPauseBtn);
playerBoxNextBtn.addEventListener("click", handleNextBtnClick);
