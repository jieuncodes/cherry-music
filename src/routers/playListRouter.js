import express from "express";
import {
  getAddPlayList,
  playListMain,
  postAddPlayList,
} from "../controllers/playlistControllers.js";
import { loggedInOnlyMiddleware } from "../middleware.js";
import { search, sendSearchResults } from "../controllers/globalControllers.js";

const playListRouter = express.Router();

playListRouter.get("/", loggedInOnlyMiddleware, playListMain);
playListRouter
  .route("/add")
  .all(loggedInOnlyMiddleware)
  .get(getAddPlayList)
  .post(postAddPlayList);
playListRouter.get("/add/search-results/:keyword", sendSearchResults);
playListRouter.get("/search/:keyword", search);

export default playListRouter;
