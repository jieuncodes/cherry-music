import express from "express";
import { home, search } from "../controllers/globalControllers.js";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);

export default rootRouter;
