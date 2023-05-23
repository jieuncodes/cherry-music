import express from "express";
import { home } from "../controllers/globalControllers.js";
import { playListMain } from "../controllers/playlistControllers.js";

const rootRouter = express.Router();

rootRouter.get("/", home);

export default rootRouter;
