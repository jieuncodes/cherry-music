import Track from "../../models/Track.js";
import YoutubeData from "../../models/YoutubeData.js";
import { getLastFmTopTracks, getLastFmTrackInfo } from "../api/lastFmApi.js";
import { getYoutubeVideoId } from "../api/youtubeApi.js";

export const home = async (req, res) => {
  const lastFmTopTracks = await getLastFmTopTracks();
  const topTracks = lastFmTopTracks.tracks.track;

  const trackDetails = await Promise.all(
    topTracks.map(async (track) => {
      const lastFmTrackInfo = await getLastFmTrackInfo({
        artist: track.artist.name,
        trackTitle: track.name,
      });
      const albumImage =
        lastFmTrackInfo.albumImg || "/images/default_album_img.png";

      const trackTitle = lastFmTrackInfo.trackTitle || "No title info";
      const artist = lastFmTrackInfo.artist || "No artist info";

      const youtubeVideoId = await getYoutubeVideoId({ trackTitle, artist });

      const newTrack = await Track.create({
        trackTitle,
        artist,
        albumImage,
        youtubeVideoId,
      });

      return newTrack;
    })
  );

  return res.render("home", {
    trackDetails,
    pageTitle: "Home",
  });
};
