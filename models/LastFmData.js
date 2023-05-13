import mongoose from "mongoose";

const lastFmTrackSchema = new mongoose.Schema(
  {
    artist: { type: String, required: true },
    trackTitle: { type: String, required: true },
    albumName: { type: String },
    albumImg: {type:String},
    duration: { type: Number },
    playcount: { type: Number },
    trackId: { type: String,required:true },
    tags: [String],
  },
);

const LastFmTrack = mongoose.model("LastFmTrack", lastFmTrackSchema);

export default LastFmTrack;
