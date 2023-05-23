import express from "express";
import {
  getAddPlayList,
  playListMain,
} from "../controllers/playlistControllers.js";
import { loggedInOnlyMiddleware } from "../middleware.js";

const playListRouter = express.Router();

playListRouter.get("/", loggedInOnlyMiddleware, playListMain);
playListRouter.get("/add", loggedInOnlyMiddleware, getAddPlayList);

export default playListRouter;
