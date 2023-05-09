import fetch from "node-fetch";

const LAST_FM_BASE_URL = "https://ws.audioscrobbler.com/2.0";

export const fetchTopTracks = async () => {
  try {
    const response = await fetch(
      `${LAST_FM_BASE_URL}/?method=chart.getTopTracks&api_key=${process.env.LAST_FM_API_KEY}&format=json`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching data from Last.fm API:", error.message);
    throw error;
  }
};

