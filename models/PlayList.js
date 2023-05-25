import mongoose from "mongoose";

const playListSchema = new mongoose.Schema({
  queue: [
    {
      videoId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
      },
      artist: {
        type: String,
      },
    },
  ],
});

const PlayList = mongoose.model("PlayList", playListSchema);

export default playListSchema;
