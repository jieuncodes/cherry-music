import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  getChangePassword,
  postChangePassword,
} from "../controllers/userControllers.js";
import { publicOnlyMiddleware } from "../middleware.js";

const userRouter = express.Router();

userRouter.route("/join").get(publicOnlyMiddleware,getJoin).post(postJoin);
userRouter.route("/login").get(publicOnlyMiddleware,getLogin).post(postLogin);
userRouter.get("/logout", logout);
userRouter
  .route("/change_password")
  .get(getChangePassword)
  .post(postChangePassword);

export default userRouter;
