import express from "express";
const rootRouter = express.Router();
import {home} from "../controllers/globalControllers.js"

rootRouter.get("/", home);

export default rootRouter;
