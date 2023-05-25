import PlayList from "../../models/PlayList.js";

export const playListMain = (req, res) => {
  return res.render("playlist");
};

export const getAddPlayList = (req, res) => {
  return res.render("add_playlist");
};

export const postAddPlayList = async (req, res) => {
  const { title, description, tracks, coverImageUrl } = req.body;
  console.log("req.body", req.body);

  try {
    const newPlaylist = new PlayList({
      title,
      tracks,
      description,
      coverImageUrl,
      creator: req.session.username,
    });

    await newPlaylist.save();
    return res.redirect("/playlist");
  } catch (error) {
    console.error(error);
    return res.render("add_playlist", {
      errorMessage: "Failed to create playlist.",
    }); // Render the same page with an error message
  }
};
