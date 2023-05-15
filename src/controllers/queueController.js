import Queue from "../../models/PlayListQueue.js";

const defaultQueueId = "507f1f77bcf86cd799439011";

export const addMusicToQueue = async (req, res) => {
  try {
    const {
      params: { id },
      body: { title, artist },
    } = req;

    let queue = await Queue.findOne({ _id: defaultQueueId });
    if (!queue) {
      queue = await Queue.create({
        _id: defaultQueueId,
        queue: [],
      });
    }

    queue.queue.unshift({ videoId: id, title, artist });
    await queue.save();

    res.status(200).send("Music added to the queue successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
};
