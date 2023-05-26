import PlayList from "../../models/PlayList.js";
import Track from "../../models/Track.js";
import User from "../../models/User.js";

export const playListMain = async (req, res) => {
  const userId = req.session.user._id;
  const userPlaylists = await PlayList.find({ creator: userId });
  console.log("userPlaylists", userPlaylists);
  let hasPlaylists = userPlaylists.length > 0 ? true : false;

  return res.render("playlist", { userPlaylists, hasPlaylists });
};

export const getAddPlayList = (req, res) => {
  return res.render("add_playlist");
};

export const postAddPlayList = async (req, res) => {
  const {
    body: { title, description },
    session: {
      user: { _id: userId, username },
    },
    file: { filename },
  } = req;
  const parsedTracks = JSON.parse(req.body.tracks);
  const trackVideoIds = parsedTracks.map((track) => track.videoId);

  try {
    const tracksFoundInDB = [];

    for (const trackId of trackVideoIds) {
      const track = await Track.findOne({ youtubeVideoId: trackId });
      if (track) {
        console.log("track", track);
        tracksFoundInDB.push(track._id);
      }
    }

    const playlist = await PlayList.create({
      title,
      tracks: tracksFoundInDB,
      description,
      coverImageUrl: `/uploads/cover_images/${filename}`,
      creator: userId,
      creatorUserName: username,
    });
    playlist.save();

    const updatePlaylist = await User.findByIdAndUpdate(
      userId,
      { $push: { generatedPlayLists: playlist._id } },
      { new: true }
    );

    // console.log("update User with the PL", updatePlaylist);

    return res.json({ message: "Playlist created successfully" });
  } catch (error) {
    console.error("error!!!", error);
    return res.render("add_playlist", {
      errorMessage: "Failed to create playlist.",
    });
  }
};
