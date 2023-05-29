import { addMusicToQueue } from "./controllers/queue.js";
import { playerReadyPromise, state } from "./main.js";
import {
  paintPlayerWithTrackInfo,
  updateNextButtonStatus,
  updatePrevButtonStatus,
} from "./painters.js";
import { paintPlayerScreen } from "./playerScreen.js";

export const playerBox = document.getElementById("player-box");
export const playerBoxPlayBtn = playerBox.querySelector(".play-btn");
export const playerBoxNextBtn = playerBox.querySelector(".next-btn");

//todo: put the client pl in the localStroage
export const isPlayerPlaying = () =>
  state.iframePlayer &&
  state.iframePlayer.getPlayerState() === YT.PlayerState.PLAYING;

export async function togglePlayPauseBtn() {
  await playerReadyPromise;
  return isPlayerPlaying()
    ? state.iframePlayer.pauseVideo()
    : state.iframePlayer.playVideo();
}

export const updateTrackIndex = (direction) => {
  if (
    direction === "next" &&
    state.currQueueIndex < state.clientPlaylist.length - 1
  ) {
    state.currQueueIndex++;
  } else if (direction === "prev" && state.currQueueIndex > 0) {
    state.currQueueIndex--;
  }
};

export const handleMusicCardClick = async ({
  videoId,
  title,
  artist,
  albumImageUrl,
}) => {
  await playerReadyPromise;
  if (state.iframePlayer) {
    addMusicToQueue({ videoId, title, artist, albumImageUrl });
  } else {
    console.error("Player has not been initialized yet");
  }
};

export function handleNextBtnClick() {
  updateTrackIndex("next");
  const nextTrack = state.clientPlaylist[state.currQueueIndex];
  paintPlayerWithTrackInfo();
  paintPlayerScreen();

  state.iframePlayer.loadVideoById(nextTrack.videoId);
  updateNextButtonStatus();
  updatePrevButtonStatus();
}

export function handlePrevBtnClick() {
  updateTrackIndex("prev");
  paintPlayerWithTrackInfo();
  paintPlayerScreen();
  updateNextButtonStatus();
  updatePrevButtonStatus();

  state.iframePlayer.loadVideoById(
    state.clientPlaylist[state.currQueueIndex].videoId
  );
}

playerBoxPlayBtn.addEventListener("click", togglePlayPauseBtn);
playerBoxNextBtn.addEventListener("click", handleNextBtnClick);
