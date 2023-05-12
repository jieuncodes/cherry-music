import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  trackTitle: { type: String, required: true, trim: true },
  artist: { type: String, required: true, trim: true },
  albumCoverImage: { type: String, trim: true },
  youtubeData: { type: mongoose.Schema.Types.ObjectId, ref: "YoutubeData" },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
