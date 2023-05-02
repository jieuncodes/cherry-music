import express from "express";
import { home } from "../controllers/globalController";

const rootRouter = express.Router();

rootRouter.get("/", home);

export default rootRouter;
