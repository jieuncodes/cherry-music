import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

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
