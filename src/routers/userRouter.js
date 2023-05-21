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
  myPage,
  accountSetting,
} from "../controllers/userControllers.js";
import {
  loggedInOnlyMiddleware,
  profilePicErrorHandlerMiddleware,
  profilePicUploadMiddleware,
  publicOnlyMiddleware,
} from "../middleware.js";

const userRouter = express.Router();

userRouter
  .route("/join")
  .all(publicOnlyMiddleware)
  .get(getJoin)
  .post(profilePicUploadMiddleware, profilePicErrorHandlerMiddleware, postJoin);
userRouter.route("/login").get(publicOnlyMiddleware, getLogin).post(postLogin);
userRouter.get("/logout", logout);
userRouter.route("/change_password").post(postChangePassword);

userRouter.get("/checkUsername/:username", checkUsername);
userRouter.get("/mypage", loggedInOnlyMiddleware, myPage);
userRouter.get("/setting", loggedInOnlyMiddleware, accountSetting);

export default userRouter;
