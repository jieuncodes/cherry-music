import { google } from "googleapis";
import YoutubeData from "../../models/YoutubeData.js";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

export const getYoutubeVideoId = async ({ trackTitle, artist }) => {
  const query = `${trackTitle} ${artist}`;

  const cachedData = await YoutubeData.findOne({ query });

  if (cachedData) {
    return cachedData.videoId;
  }

  const requestConfig = {
    part: "id",
    q: query,
    type: "video",
    maxResults: 1,
  };

  try {
    const response = await youtube.search.list(requestConfig);
    const { items } = response.data;

    if (!items || items.length === 0) {
      throw new Error("No videos found");
    }
    const videoId = items[0].id.videoId;

    const youtubeData = new YoutubeData({ query, videoId });
    await youtubeData.save();

    return videoId;
  } catch (error) {
    console.error("Error fetching video ID:", error);
    throw error;
  }
};

export const getYoutubeMostPopular = async () => {
  try {
    const response = await youtube.search.list({
      part: "snippet",
      chart: "mostPopular",
      type: "video",
      videoCategoryId: "10",
      maxResults: 20,
    });

    const videos = response.data.items;
    console.log(videos);
  } catch (error) {
    console.error("Error:", error);
  }
};
