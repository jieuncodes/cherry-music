import bcrypt from "bcrypt";
import User from "../../models/User.js";

export const getJoin = (req, res) => {
  return res.render("user/join", { pageTitle: "Join Cherry Music" });
};

export const checkUsername = async (req, res) => {
  console.log("checking");
  const username = req.params.username;
  const usernameExists = await User.exists({ username });
  res.send({ usernameExists });
};

export const postJoin = async (req, res) => {
  const pageTitle = "Join Cherry Music!";
  const { email, username, password, password2 } = req.body;
  console.log("", req.body);

  let picFile = req.file;
  console.log("", picFile);
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
      errorMessage: "An account with this user-id does not exists.",
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
  // flash msg here
  return res.redirect("/");
};

export const getChangePassword = (req, res) => {
  return res.render("user/change_password", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const pageTitle = "Change Password";
  const {
    session: {
      user: { _id },
    },
    body: { password, password2 },
  } = req;
  const userBeforeUpdate = await User.findById(_id);
  const isItSamePWAsBefore = await bcrypt.compare(
    password,
    userBeforeUpdate.password
  );

  if (password !== password2) {
    return res.status(400).render("user/change_password", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  if (isItSamePWAsBefore) {
    return res.status(400).render("user/change_password", {
      pageTitle,
      errorMessage: "The password must be different from the previous one.",
    });
  }

  userBeforeUpdate.password = password;
  await userBeforeUpdate.save();
  req.session.destroy();
  return res.redirect(`/user/${_id}`);
};
