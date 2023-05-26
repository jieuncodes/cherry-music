import PlayList from "../../models/PlayList.js";
import Track from "../../models/Track.js";
import { getLastFmTopTracks, getLastFmTrackInfo } from "../api/lastFmApi.js";
import { getYoutubeVideoId } from "../api/youtubeApi.js";

export const home = async (req, res) => {
  //top tracks section
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
  const allPlaylists = await PlayList.find({}).limit(8);

  const homeBgImgUrl = "/images/main_background.png";

  return res.render("home", {
    trackDetails,
    pageTitle: "Home",
    homeBgImgUrl,
    allPlaylists,
  });
};

const performSearch = async (keyword) => {
  if (keyword === "") {
    return { noResult: true, searchedTracks: [] };
  } else if (keyword) {
    const searchedTracks = await Track.find({
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
    return { searchedTracks, keyword };
  }
};

export const search = async (req, res) => {
  const keyword = req.query.search;
  const results = await performSearch(keyword);
  return res.render("search", results);
};

export const sendSearchResults = async (req, res) => {
  const keyword = req.params.keyword;
  const results = await performSearch(keyword);
  return res.json(results);
};
