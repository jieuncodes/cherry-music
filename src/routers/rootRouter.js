import express from "express";
import { home } from "../controllers/globalControllers.js";

const rootRouter = express.Router();

rootRouter.get("/", home);

export default rootRouter;
