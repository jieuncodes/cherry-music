import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import "./db.js";
import { localsMiddleware } from "./middleware.js";
import rootRouter from "./routers/rootRouter.js";
import { queueRouter } from "./routers/queueRouter.js";
import userRouter from "./routers/userRouter.js";
import playListRouter from "./routers/playListRouter.js";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Cross-Origin-Embedder-Policy", "credentialless");
  res.header("Access-Control-Allow-Headers");
  res.header("Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
// app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(flash());
app.use(localsMiddleware);

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use(express.static("public"));

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/playlist", playListRouter);

app.use("/queue", queueRouter);

export default app;
