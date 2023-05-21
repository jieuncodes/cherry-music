import bcrypt from "bcrypt";
import User from "../../models/User.js";

export const getJoin = (req, res) => {
  return res.render("user/join", { pageTitle: "Join Cherry Music" });
};

export const checkUsername = async (req, res) => {
  const username = req.params.username;
  const usernameExists = await User.exists({ username });
  res.send({ usernameExists });
};

export const postJoin = async (req, res) => {
  const pageTitle = "Join Cherry Music!";
  const { email, username, password, password2 } = req.body;
  console.log("req.body", req.body);
  let picFile = req.file;
  let noAvatar = false;
  if (!picFile) {
    picFile = {
      path: "/images/default_user_avatar.jpeg",
    };
    noAvatar = true;
  }

  const errors = {};

  const emailExists = await User.exists({ email });
  if (emailExists) {
    errors.emailErrorMessage = "이미 가입된 이메일입니다.";
  }
  const usernameExists = await User.exists({ username });
  if (usernameExists) {
    errors.usernameErrorMessage = "유저 아이디가 이미 사용되었습니다.";
  }

  if (password !== password2) {
    errors.passwordErrorMessage = "비밀번호가 일치하지 않습니다. ";
  }
  if (req.multerError) {
    errors.fileErrorMessage = req.multerError;
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).render("user/join", {
      pageTitle,
      error: errors,
    });
  }

  try {
    const newUser = await User.create({
      email,
      password,
      username,
      profilePicPath: picFile.path,
    });

    console.log("userCreated!!", newUser);
    return res.redirect("/user/login");
  } catch (error) {
    console.log("errorMsg", error);

    return res.status(400).render("user/join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => {
  return res.render("user/login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId });
  if (!user) {
    return res.status(400).render("user/login", {
      pageTitle: "Login",
      errorMessage: "가입된 유저 아이디가 아닙니다.",
    });
  }

  const ok = bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "Wrong Password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.user = null;
  req.session.loggedIn = false;
  req.session.destroy();

  // flash msg here
  return res.redirect("/");
};

export const myPage = (req, res) => {
  res.render("user/my_page", { pageTitle: "내정보" });
};

export const getAccountSetting = (req, res) => {
  res.render("user/account_setting", { pageTitle: "개인정보 관리" });
};

export const postAccountSetting = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { password, password2 },
  } = req;

  //change password
  if (password !== password2) {
    return res.status(400).render("user/account_setting", {
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }
  const userBeforeUpdate = await User.findById(_id);
  if (!userBeforeUpdate || !userBeforeUpdate.password) {
    return res.status(400).render("user/account_setting", {
      errorMessage: "No user found or user has no password.",
    });
  }

  const isItSamePWAsBefore = await bcrypt.compare(
    password,
    userBeforeUpdate.password
  );

  if (isItSamePWAsBefore) {
    return res.status(400).render("user/account_setting", {
      errorMessage: "사용하던 비밀번호와 달라야 합니다.",
    });
  }

  userBeforeUpdate.password = password;
  await userBeforeUpdate.save();

  return res.status(200).render("user/account_setting", {
    successMessage: "비밀번호가 성공적으로 변경되었습니다.",
  });
};
