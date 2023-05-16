import { paintPlayerScreen } from "./playerScreen.js";

let player;
const musicCards = document.querySelectorAll("#music-card");
const playerBox = document.getElementById("player-box");
const playButton = playerBox.querySelector(".play-btn");
const nextButton = playerBox.querySelector(".next-btn");

export let clientPlayList = [];
export let currentTrackIndex = 0;
const paintPlayerWithTrackInfo = () => {
  playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';

  const track = clientPlayList[currentTrackIndex];
  const albumImgArea = playerBox.querySelector(".album-cover");
  const trackTitleArea = playerBox.querySelector(".track-title");
  const artistArea = playerBox.querySelector(".artist");
  albumImgArea.style.backgroundImage = `url(${track.albumImageUrl})`;
  trackTitleArea.innerHTML = track.title;
  artistArea.innerHTML = track.artist;
};

const handlePlayBtnClick = () => {
  if (
    player &&
    (player.getPlayerState() === YT.PlayerState.PLAYING) |
      (player.getPlayerState() === -1)
  ) {
    player.pauseVideo();
    playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else if (player && player.getPlayerState() === YT.PlayerState.PAUSED) {
    player.playVideo();
    playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
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

playButton.addEventListener("click", handlePlayBtnClick);
nextButton.addEventListener("click", handleNextBtnClick);
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
    } else {
      console.error("Player element not found in the DOM");
    }
  };
});
