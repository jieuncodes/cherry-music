export const paintMusicCard = (track) => {
  const musicCard = document.createElement("div");
  musicCard.classList.add("playlist-music-card");
  musicCard.id = "music-card";
  musicCard.setAttribute("data-videoid", track.youtubeVideoId);
  musicCard.setAttribute("data-title", track.trackTitle);
  musicCard.setAttribute("data-artist", track.artist);
  musicCard.setAttribute("data-albumimageurl", track.albumImageUrl);
  musicCard.innerHTML = `
          <div class="album-cover" style="background-image: url(${track.albumImageUrl})"></div>
          <div class="track-title-area">
            <div class="track-title">${track.trackTitle}</div>
          </div>
          <div class="artist">${track.artist}</div>
      `;
  return musicCard;
};
