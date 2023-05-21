import morgan from "morgan";
import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteTitle = "Cherry Music";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  console.log("", res.locals.loggedInUser);
  console.log("**session**", req.session);
  next();
};

export const logger = morgan("dev");

export const loggedInOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "먼저 로그인 해주세요");
    return res.redirect("/user/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "권한이 없음");
    return res.redirect("/");
  }
};

export const profilePicUpload = multer({
  dest: "uploads/profile_pic/",
}).fields([{ name: "profile_pic", maxCount: 1 }]);
