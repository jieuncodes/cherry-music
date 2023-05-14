document.addEventListener('DOMContentLoaded', () => {
  const musicCards = document.querySelectorAll("#music-card");
  const playerBox = document.getElementById('player-box');
  const playButton = playerBox.querySelector('.play-btn');

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  let player;

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  let done = false;

  const onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.PLAYING && !done) {
      done = true;
    }
  };

  const stopVideo = () => {
    player.stopVideo();
  };

  const onMusicCardClick = (videoId) => {
    console.log(videoId);
    console.log(player);
    if (!player) {
      console.error("Player has not been initialized yet");
      return;
    }
    player.loadVideoById(videoId);
  };

  const handlePlayBtnClick = () => {
    console.log('', YT.PlayerState);
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
      playButton.innerHTML = `<i class="fa-solid fa-play"></i>`
      player.pauseVideo();
    } else {
      playButton.innerHTML = `<i class="fa-solid fa-pause"></i>`
      player.playVideo();
    }
  };









  window.onYouTubeIframeAPIReady = () => {
    const playerElement = document.getElementById("youtube-player");
    if (!playerElement) {
      console.error("Player element not found in the DOM");
      return;
    }

    player = new YT.Player(playerElement, {
      videoId: "Xit3nVfE18M",
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };

  musicCards.forEach((musicCard) => {
    if (!musicCard.dataset.videoid) {
      console.error("Music card does not have a data-videoid attribute");
      return;
    }

    musicCard.addEventListener("click", () => {
      onMusicCardClick(musicCard.dataset.videoid);
    });
  });

  playButton.addEventListener('click', handlePlayBtnClick);

});
