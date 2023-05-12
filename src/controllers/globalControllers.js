import { getLastFmTopTracks, getLastFmTrackInfo } from "../api/lastFmApi.js";
import { getYoutubeVideoId } from "../api/youtubeApi.js";

export const home = async (req, res) => {
  const lastFmTopTracks = await getLastFmTopTracks();
  const topTracks = lastFmTopTracks.tracks.track;

  const trackDetails = await Promise.all(
    topTracks.map(async (track) => {
      const trackDetail = await getLastFmTrackInfo({
        artist: track.artist.name,
        trackTitle: track.name,
      });
      const albumImage =
        trackDetail?.track?.album?.image[2]["#text"] ||
        "../../default_album_img.png";

      const trackTitle = trackDetail?.track?.name || "No title info";
      const artist = trackDetail?.track?.artist?.name || "No artist info";
      const youtubeVideoId = await getYoutubeVideoId({ trackTitle, artist });
      return {
        trackTitle,
        artist,
        albumImage,
        youtubeVideoId,
      };
    })
  );
  console.log("", trackDetails);
  return res.render("home", {
    trackDetails,
    pageTitle: "Home",
  });
};
