export const paintMusicCard = (track) => {
  const musicCard = document.createElement("div");
  musicCard.classList.add("playlist-music-card");
  musicCard.id = "music-card";
  if (track.youtubeVideoId) {
    musicCard.setAttribute("data-videoid", track.youtubeVideoId);
  } else if (track.videoId) {
    musicCard.setAttribute("data-videoid", track.videoId);
  }
  musicCard.setAttribute("data-title", track.trackTitle || track.title);
  musicCard.setAttribute("data-artist", track.artist);
  musicCard.setAttribute("data-albumimageurl", track.albumImageUrl);
  musicCard.innerHTML = `
          <div class="album-cover" style="background-image: url(${
            track.albumImageUrl
          })"></div>
          <div class="track-title-area">
            <div class="track-title">${track.trackTitle || track.title}</div>
          </div>
          <div class="artist">${track.artist}</div>
      `;
  return musicCard;
};

export const mountPlayListTracks = (targetPlaylist) => {
  const musicCardsContainer = document.createElement("div");
  musicCardsContainer.classList.add("music-cards-container");

  targetPlaylist.forEach((track) => {
    const musicCard = paintMusicCard(track);
    const playBtn = document.createElement("button");
    playBtn.classList.add("play-btn");

    const icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-ellipsis-vertical");
    playBtn.appendChild(icon);

    musicCard.appendChild(playBtn);

    musicCardsContainer.appendChild(musicCard);
  });
  return musicCardsContainer;
};
