let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: "Xit3nVfE18M",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onMusicCardClick(videoId) {
  player.loadVideoById(videoId);
}

const musicCards = document.getElementsByClassName("music-card");
console.log("music", musicCards);
for (var i = 0; i < musicCards.length; i++) {
  musicCards[i].addEventListener("click", function () {
    onMusicCardClick(this.dataset.videoId);
  });
}
