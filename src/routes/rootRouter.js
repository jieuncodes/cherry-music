import express from "express";
import { home } from "../controllers/globalController.js";

const rootRouter = express.Router();

// rootRouter.get("/", home);

export default rootRouter;
