import { iframe, setState, state } from "../main.js";

export const timeline = document.getElementById("timeline");

export let isVideoPlaying = false;

const handleTimeLineChange = (event) => {
  const {
    target: { value },
  } = event;
  if (state.iframePlayer && state.iframePlayer.getDuration) {
    const videoDuration = state.iframePlayer.getDuration();
    const seekToSeconds = (value / 100) * videoDuration;
    state.iframePlayer.seekTo(seekToSeconds, true);
  } else {
    console.error("Player is not ready");
  }
};

const handleTimeLineMouseDown = () => {
  isVideoPlaying =
    state.iframePlayer.getPlayerState() === YT.PlayerState.PLAYING;
  if (isVideoPlaying) {
    const newIframeState = state.iframePlayer.pauseVideo();
    setState({ iframePlayer: newIframeState });
    playerBoxPlayBtn.childNodes[0].classList.replace("fa-pause", "fa-play");
    playerScreenPlayBtn.childNodes[0].classList.replace("fa-pause", "fa-play");
  }
};

const handleTimeLineMouseUp = () => {
  if (isVideoPlaying) {
    player.playVideo();
    playerBoxPlayBtn.childNodes[0].classList.replace("fa-play", "fa-pause");
    playerScreenPlayBtn.childNodes[0].classList.replace("fa-play", "fa-pause");
  }
};

timeline.addEventListener("input", handleTimeLineChange);
timeline.addEventListener("mousedown", handleTimeLineMouseDown);
timeline.addEventListener("mouseup", handleTimeLineMouseUp);
