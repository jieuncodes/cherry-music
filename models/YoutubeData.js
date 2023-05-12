import mongoose from "mongoose";

const youtubeDataSchema = new mongoose.Schema({
  query: String,
  videoId: String,
});

const YoutubeData = mongoose.model("YoutubeData", youtubeDataSchema);

export default YoutubeData;
