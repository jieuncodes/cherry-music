import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
  trackTitle: { type: String, required: true, trim: true },
  artist: { type: String, required: true, trim: true },
  albumImageUrl: { type: String, trim: true },
  youtubeVideoId: { type: String },
});

const Track = mongoose.model("Track", trackSchema);

export default Track;
