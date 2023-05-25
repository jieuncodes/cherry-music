import mongoose from "mongoose";

const playListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
  description: String,
  coverImageUrl: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const PlayList = mongoose.model("PlayList", playListSchema);

export default PlayList;
