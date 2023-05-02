import express from "express";
import rootRouter from "./routers/rootRouter";

const app = express();

const LAST_FM_BASE_URL = "https://ws.audioscrobbler.com/2.0";

const fetchAlbumData = async (req, res) => {
  try {
    const response = await fetch(
      `${LAST_FM_BASE_URL}/?method=album.search&album=${SEARCH_TERM}&api_key=${LAST_FM_API_KEY}&format=json`
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from Last.fm API:", error.message);
    res.status(500).json({ error: "Failed to fetch data from Last.fm API" });
  }
};

app.get("/api/lastfm", fetchAlbumData);

app.use("/", rootRouter);

const handleListening = () => console.log("Listening on port 4000");

app.listen(4000, handleListening);

export default app;
