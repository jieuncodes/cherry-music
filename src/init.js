import "dotenv/config";
import app from "./server.js";

const PORT = process.env.PORT || 3000;

const handleListening = () =>
  console.log(`✅Server Listening on port ${PORT}🎉`);

app.listen(PORT, handleListening);
