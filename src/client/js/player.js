let player;
const musicCards = document.querySelectorAll("#music-card");
const playerBox = document.getElementById("player-box");
const playButton = playerBox.querySelector(".play-btn");
let clientPlayList = [];

const paintPlayerWithTrackInfo = () => {
  playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';

  const queueFirstTrack = clientPlayList[0];
  const albumImgArea = playerBox.querySelector(".album-cover");
  const trackTitleArea = playerBox.querySelector(".track-title");
  const artistArea = playerBox.querySelector(".artist");
  albumImgArea.style.backgroundImage = `url(${queueFirstTrack.albumImage})`;
  trackTitleArea.innerHTML = queueFirstTrack.title;
  artistArea.innerHTML = queueFirstTrack.artist;
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

const addMusicToQueue = async ({ videoId, title, artist, albumImage }) => {
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
    albumImage,
  });

  if (player) {
    player.stopVideo();
    const firstTrack = clientPlayList[0];
    if (firstTrack) {
      paintPlayerWithTrackInfo();
      player.loadVideoById(firstTrack.videoId);
    }
  } else {
    console.error("Player has not been initialized yet");
  }
};

const onMusicCardClick = ({ videoId, title, artist, albumImage }) => {
  if (player) {
    addMusicToQueue({ videoId, title, artist, albumImage });
  } else {
    console.error("Player has not been initialized yet");
  }
};

musicCards.forEach((musicCard) => {
  const videoId = musicCard.dataset.videoid;
  const title = musicCard.dataset.title;
  const artist = musicCard.dataset.artist;
  const albumImage = musicCard.dataset.albumimage;

  if (videoId) {
    musicCard.addEventListener("click", () =>
      onMusicCardClick({ videoId, title, artist, albumImage })
    );
  } else {
    console.error("Music card does not have a data-videoid attribute");
  }
});

playButton.addEventListener("click", handlePlayBtnClick);

const onPlayerStateChange = (event) => {
  if (event.data === YT.PlayerState.ENDED) {
    const nextVideo = clientPlayList.shift();
    if (nextVideo) {
      player.loadVideoById(nextVideo.videoId);
    }
  }
};

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
