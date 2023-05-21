import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  checkUsername,
  myPage,
  getAccountSetting,
  postAccountSetting,
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

userRouter.get("/checkUsername/:username", checkUsername);
userRouter.get("/mypage", loggedInOnlyMiddleware, myPage);

userRouter
  .route("/setting")
  .all(loggedInOnlyMiddleware)
  .get(getAccountSetting)
  .post(
    profilePicUploadMiddleware,
    profilePicErrorHandlerMiddleware,
    postAccountSetting
  );

export default userRouter;
