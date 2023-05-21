import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  getChangePassword,
  postChangePassword,
  checkUsername,
} from "../controllers/userControllers.js";
import { profilePicUpload, publicOnlyMiddleware } from "../middleware.js";

const userRouter = express.Router();

userRouter
  .route("/join")
  .all(publicOnlyMiddleware)
  .get(getJoin)
  .post(profilePicUpload, postJoin);
userRouter.route("/login").get(publicOnlyMiddleware, getLogin).post(postLogin);
userRouter.get("/logout", logout);
userRouter
  .route("/change_password")
  .get(getChangePassword)
  .post(postChangePassword);

userRouter.get("/checkUsername/:username", checkUsername);

export default userRouter;
