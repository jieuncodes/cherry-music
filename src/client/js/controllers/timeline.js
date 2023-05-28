import { iframe } from "../main.js";

export const timeline = document.getElementById("timeline");

export let isVideoPlaying = false;

const handleTimeLineChange = (event) => {
  const {
    target: { value },
  } = event;
  if (iframe.player && iframe.player.getDuration) {
    const videoDuration = iframe.player.getDuration();
    const seekToSeconds = (value / 100) * videoDuration;
    iframe.player.seekTo(seekToSeconds, true);
  } else {
    console.error("Player is not ready");
  }
};

const handleTimeLineMouseDown = () => {
  isVideoPlaying = iframe.player.getPlayerState() === YT.PlayerState.PLAYING;
  if (isVideoPlaying) {
    iframe.player.pauseVideo();
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
