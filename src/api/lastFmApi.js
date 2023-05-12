import fetch from "node-fetch";
import { URL } from "url";

const LAST_FM_BASE_URL = "https://ws.audioscrobbler.com/2.0";

export const getLastFmTopTracks = async () => {
  try {
    const url = new URL(LAST_FM_BASE_URL);
    const params = new URLSearchParams({
      method: "chart.getTopTracks",
      api_key: process.env.LAST_FM_API_KEY,
      format: "json",
    });
    url.search = params;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Last.fm API:", error.message);
    throw error;
  }
};

export const getLastFmTrackInfo = async ({ artist, trackTitle }) => {
  try {
    const url = new URL(LAST_FM_BASE_URL);
    const params = new URLSearchParams({
      method: "track.getInfo",
      api_key: process.env.LAST_FM_API_KEY,
      artist: artist,
      track: trackTitle,
      format: "json",
    });
    url.search = params;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Last.fm API:", error.message);
    throw error;
  }
};
