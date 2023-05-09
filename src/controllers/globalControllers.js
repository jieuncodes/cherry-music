import { fetchTopTracks } from "../api/lastFmApi.js";

export const home = async (req, res) => {
  const data = await fetchTopTracks();
  const topTracks = data.tracks.track;
  console.log('', topTracks[0].image);
  
  return res.render("home", { topTracks, pageTitle: "Home" });
};
