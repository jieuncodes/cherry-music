let player;

const musicCards = document.querySelectorAll("#music-card");
const playerBox = document.getElementById("player-box");
const playButton = playerBox.querySelector(".play-btn");

const handlePlayBtnClick = () => {
  if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
    player.pauseVideo();
    playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else if (player) {
    player.playVideo();
    playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
};

const addMusicToQueue = async (videoId) => {
  // console.log("client addMusic", videoId);
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

    // console.log("response", response.status);
    // console.log("response body", await response.text());
  } catch (error) {
    console.error("Fetch failed");
  }
};

const onMusicCardClick = (videoId) => {
  if (player) {
    addMusicToQueue(videoId);

    // player.loadVideoById(videoId);
  } else {
    console.error("Player has not been initialized yet");
  }
};

musicCards.forEach((musicCard) => {
  const videoId = musicCard.dataset.videoid;

  if (videoId) {
    musicCard.addEventListener("click", () => onMusicCardClick(videoId));
  } else {
    console.error("Music card does not have a data-videoid attribute");
  }
});

playButton.addEventListener("click", handlePlayBtnClick);

document.addEventListener("DOMContentLoaded", () => {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  let done = false;

  const onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.PLAYING && !done) {
      done = true;
    }
  };

  window.onYouTubeIframeAPIReady = () => {
    const playerElement = document.getElementById("youtube-player");

    if (playerElement) {
      player = new YT.Player(playerElement, {
        videoId: "Xit3nVfE18M",
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    } else {
      console.error("Player element not found in the DOM");
    }
  };
});
