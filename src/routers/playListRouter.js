import express from "express";
import {
  getAddPlayList,
  playListMain,
} from "../controllers/playlistControllers.js";
import { loggedInOnlyMiddleware } from "../middleware.js";
import { search, sendSearchResults } from "../controllers/globalControllers.js";

const playListRouter = express.Router();

playListRouter.get("/", loggedInOnlyMiddleware, playListMain);
playListRouter.get("/add", loggedInOnlyMiddleware, getAddPlayList);
playListRouter.get("/add/search-results/:keyword", sendSearchResults);
playListRouter.get("/search/:keyword", search);

export default playListRouter;
