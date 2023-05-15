import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  queue: [
    {
      videoId: {
        type: String,
        required: true,
      },
    },
  ],
});

const Queue = mongoose.model("Queue", queueSchema);

export default Queue;
