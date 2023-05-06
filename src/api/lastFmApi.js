import fetch from "node-fetch";

const LAST_FM_BASE_URL = "https://ws.audioscrobbler.com/2.0";
const ARTIST_NAME = "Masked Wolf";

export const fetchTopTracks = async (req, res) => {
  try {
    const response = await fetch(
      `${LAST_FM_BASE_URL}/?method=artist.getTopTracks&artist=${encodeURIComponent(
        ARTIST_NAME
      )}&api_key=${process.env.LAST_FM_API_KEY}&format=json`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("Error fetching data from Last.fm API:", error.message);
    res.status(500).json({ error: "Failed to fetch data from Last.fm API" });
  }
};
