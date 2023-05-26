// import morgan from "morgan";
import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteTitle = "Cherry Music";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  next();
};

// export const logger = morgan("dev");

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

export const profilePicUploadMiddleware = multer({
  dest: "uploads/profile_pic/",
  limits: { fileSize: 10000000 },
}).single("profile_pic");

export const profilePicErrorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      req.multerError =
        "파일의 용량이 너무 큽니다. 10MB이하의 이미지를 올려주세요.";
    } else {
      req.multerError = "An error occurred when uploading the file.";
    }
  } else if (err) {
    req.multerError = err;
  }
  next();
};

export const coverImageUploadMiddleware = (req, res, next) => {
  const upload = multer({
    dest: "uploads/cover_images/",
    limits: { fileSize: 10000000 },
  }).single("coverImage");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("A Multer error occurred when uploading.", err);
    } else if (err) {
      console.log("An unknown error occurred when uploading.", err);
    }

    console.log("Upload successful. Proceeding...");
    next();
  });
};
