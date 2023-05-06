import express from "express";
import rootRouter from "./routes/rootRouter.js";
import { fetchTopTracks } from "./api/lastFmApi.js";

const app = express();

app.get("/", fetchTopTracks);
app.use("/", rootRouter);

export default app;
