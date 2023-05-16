import { paintPlayerScreen, updateProgressBar } from "./playerScreen.js";

export let player;
const musicCards = document.querySelectorAll("#music-card");
const playerBox = document.getElementById("player-box");
const playerBoxPlayBtn = playerBox.querySelector(".play-btn");
const playerBoxNextBtn = playerBox.querySelector(".next-btn");

export let clientPlayList = [];
export let currentTrackIndex = 0;

export const togglePlayPause = () => {
  const playerScreenPlayBtn = document
    .getElementById("player-screen")
    .querySelector(".play-btn");

  if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
    player.pauseVideo();
    playerBoxPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    playerScreenPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else if (player && player.getPlayerState() === YT.PlayerState.PAUSED) {
    player.playVideo();
    playerBoxPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    playerScreenPlayBtn.innerHTML =
      '<i class="fa-solid fa-pause" style="font-size: 4rem; "></i>';
  }
};

const paintPlayerWithTrackInfo = () => {
  playerBoxPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

  const track = clientPlayList[currentTrackIndex];
  const albumImgArea = playerBox.querySelector(".album-cover");
  const trackTitleArea = playerBox.querySelector(".track-title");
  const artistArea = playerBox.querySelector(".artist");
  albumImgArea.style.backgroundImage = `url(${track.albumImageUrl})`;
  trackTitleArea.innerHTML = track.title;
  artistArea.innerHTML = track.artist;
};

export const handlePlayBtnClick = () => {
  console.log("playclick");
  const playerScreen = document.getElementById("player-screen");
  const playerScreenPlayBtn = playerScreen.querySelector(".play-btn");
  if (
    player &&
    (player.getPlayerState() === YT.PlayerState.PLAYING) |
      (player.getPlayerState() === -1)
  ) {
    player.pauseVideo();
    playerBoxPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    playerScreenPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else if (player && player.getPlayerState() === YT.PlayerState.PAUSED) {
    player.playVideo();
    playerBoxPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    playerScreenPlayBtn.innerHTML =
      '<i class="fa-solid fa-pause" style="font-size: 4rem; "></i>';
  }
};

const handleNextBtnClick = () => {
  if (currentTrackIndex < clientPlayList.length - 1) {
    currentTrackIndex++;
    const nextTrack = clientPlayList[currentTrackIndex];
    paintPlayerWithTrackInfo();
    player.loadVideoById(nextTrack.videoId);
  } else {
    console.log("End of playlist reached");
  }
};

const addMusicToQueue = async ({ videoId, title, artist, albumImageUrl }) => {
  try {
    const response = await fetch(`/queue/${videoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Error!!");
      return;
    }
  } catch (error) {
    console.error("Fetch failed");
  }

  clientPlayList.unshift({
    videoId,
    title,
    artist,
    albumImageUrl,
  });

  currentTrackIndex = 0;

  if (player) {
    player.stopVideo();
    const firstTrack = clientPlayList[0];
    if (firstTrack) {
      paintPlayerWithTrackInfo();
      paintPlayerScreen();

      player.loadVideoById(firstTrack.videoId);
    }
  } else {
    console.error("Player has not been initialized yet");
  }
};

const onMusicCardClick = ({ videoId, title, artist, albumImageUrl }) => {
  if (player) {
    addMusicToQueue({ videoId, title, artist, albumImageUrl });
  } else {
    console.error("Player has not been initialized yet");
  }
};

musicCards.forEach((musicCard) => {
  const videoId = musicCard.dataset.videoid;
  const title = musicCard.dataset.title;
  const artist = musicCard.dataset.artist;
  const albumImageUrl = musicCard.dataset.albumimageurl;

  if (videoId) {
    musicCard.addEventListener("click", () =>
      onMusicCardClick({ videoId, title, artist, albumImageUrl })
    );
  } else {
    console.error("Music card does not have a data-videoid attribute");
  }
});

const onPlayerStateChange = (event) => {
  if (event.data === YT.PlayerState.ENDED) {
    handleNextBtnClick();
    if (nextVideo) {
      player.loadVideoById(nextVideo.videoId);
    }
  }
};

//eventListeners

playerBoxPlayBtn.addEventListener("click", togglePlayPause);
playerBoxNextBtn.addEventListener("click", handleNextBtnClick);
document.addEventListener("DOMContentLoaded", () => {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  window.onYouTubeIframeAPIReady = () => {
    const playerElement = document.getElementById("youtube-player");
    if (playerElement) {
      player = new YT.Player(playerElement, {
        videoId: "Xit3nVfE18M",
        events: {
          onReady: (event) => event.target.playVideo(),
          onStateChange: onPlayerStateChange,
        },
      });
      setInterval(updateProgressBar, 200);
    } else {
      console.error("Player element not found in the DOM");
    }
  };
});
