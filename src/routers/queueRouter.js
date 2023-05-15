import express from "express";
import { addMusicToQueue } from "../controllers/queueController.js";

export const queueRouter = express.Router();

queueRouter.post("/:id", addMusicToQueue);
// queueRouter.put("/:id", updateQueue);
// queueRouter.delete("/:id", deleteQueue);
