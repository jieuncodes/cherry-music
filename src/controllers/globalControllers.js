import { fetchTopTracks, getTrackInfo } from "../api/lastFmApi.js";

export const home = async (req, res) => {
  const lastFmTopTracks = await fetchTopTracks();
  const topTracks = lastFmTopTracks.tracks.track;

  const trackDetails = await Promise.all(
    topTracks.map(async (track) => {
      const artist = track.artist.name;
      const trackTitle = track.name;
      const trackDetail = await getTrackInfo({ artist, trackTitle });
      const albumImage =
        trackDetail?.track?.album?.image[2]["#text"] || "../../logo.png";
      const trackDetailArtist =
        trackDetail?.track?.artist?.name || "No artist info";
      const trackDetailTitle = trackDetail?.track?.name || "No title info";

      return {
        ...trackDetail,
        trackDetailArtist,
        trackDetailTitle,
        albumImage,
      };
    })
  );
  console.log("", trackDetails);
  return res.render("home", {trackDetails,
    pageTitle: "Home",
  });
};
