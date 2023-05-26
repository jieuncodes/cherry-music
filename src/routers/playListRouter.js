import express from "express";
import {
  getAddPlayList,
  getPlayListDetails,
  playListMain,
  postAddPlayList,
} from "../controllers/playlistControllers.js";
import {
  coverImageUploadMiddleware,
  loggedInOnlyMiddleware,
} from "../middleware.js";
import { search, sendSearchResults } from "../controllers/globalControllers.js";

const playListRouter = express.Router();

playListRouter.get("/", loggedInOnlyMiddleware, playListMain);
playListRouter
  .route("/add")
  .all(loggedInOnlyMiddleware)
  .get(getAddPlayList)
  .post(coverImageUploadMiddleware, postAddPlayList);
playListRouter.get("/add/search-results/:keyword", sendSearchResults);
playListRouter.get("/search/:keyword", search);
playListRouter.get("/:playlistId", getPlayListDetails);

export default playListRouter;
