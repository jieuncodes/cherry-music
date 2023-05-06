const getTopTracks = async () => {
  const response = await fetch("/");
  const data = await response.json();
  const tracks = data.toptracks.track;

  const playlistContainer = document.getElementById("playlist");

  tracks.forEach((track) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <h3>${track.name}</h3>
      <p>Play count: ${track.playcount}</p>
      <p>Listeners: ${track.listeners}</p>
    `;

    playlistContainer.appendChild(card);
  });
};

getTopTracks();
