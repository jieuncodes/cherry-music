import fetch from "node-fetch";
import { URL } from "url";
import LastFmTrack from "../../models/LastFmData.js";

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
    const trackId = `${trackTitle}-${artist}`;
    const cachedData = await LastFmTrack.findOne({ trackId });

    if (cachedData) {
      return cachedData;
    } else {
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

      const lasfFmTrackInfo = new LastFmTrack({
        artist: data.track.artist.name,
        trackTitle: data.track.name,
        album:
          data.track.album && data.track.album.name
            ? data.track.album.name
            : "None",
        albumImg:
          data.track.album &&
          data.track.album.image &&
          data.track.album.image[2]
            ? data.track.album.image[2]["#text"]
            : undefined,
        duration: data.track.duration,
        playcount: data.track.playcount,
        trackId,
        tags: data.track.toptags.tag
          ? data.track.toptags.tag.map((t) => t.name)
          : [],
      });

      await lasfFmTrackInfo.save();

      return lasfFmTrackInfo;
    }
  } catch (error) {
    console.error("Error fetching data from Last.fm API:", error.message);
    throw error;
  }
};
