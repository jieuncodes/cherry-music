import Track from "../../models/Track.js";
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
      const albumImageUrl =
        lastFmTrackInfo.albumImg || "/images/default_album_img.png";

      const trackTitle = lastFmTrackInfo.trackTitle || "No title info";
      const artist = lastFmTrackInfo.artist || "No artist info";

      const youtubeVideoId = await getYoutubeVideoId({ trackTitle, artist });

      const existingTrack = await Track.findOne({ youtubeVideoId });

      if (existingTrack) {
        return existingTrack;
      } else {
        const newTrack = await Track.create({
          trackTitle,
          artist,
          albumImageUrl,
          youtubeVideoId,
        });
        return newTrack;
      }
    })
  );

  const homeBgImgUrl = "/images/main_background.png";
  return res.render("home", {
    trackDetails,
    pageTitle: "Home",
    homeBgImgUrl,
  });
};

export const search = async (req, res) => {
  const keyword = req.query.search;
  console.log("key", keyword);
  let searchedTracks = [];

  try {
    if (keyword === "") {
      const noResult = true;
      return res.render("search", { noResult, searchedTracks });
    } else if (keyword) {
      searchedTracks = await Track.find({
        $or: [
          {
            trackTitle: {
              $regex: new RegExp(keyword, "i"),
            },
          },
          {
            artist: {
              $regex: new RegExp(keyword, "i"),
            },
          },
        ],
      });
      return res.render("search", { searchedTracks, keyword });
    }
  } catch (error) {
    console.log("error", error);
    // return res.status(404).render("pages/error/404", {
    //   pageTitle: `Something went wrong.`,
    // });
  }
};
