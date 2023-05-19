import bcrypt from "bcrypt";
import User from "../../models/User.js";

export const getJoin = (req, res) => {
  return res.render("user/join", { pageTitle: "Join Cherry Music" });
};
export const postJoin = async (req, res) => {
  const pageTitle = "Join Cherry Music!";
  const { email, password, password2, username } = req.body;

  let picFile = req.file;
  let noAvatar = false;
  if (!picFile) {
    picFile = {
      path: "/images/default_user_avatar.jpeg",
    };
    noAvatar = true;
  }

  const exists = await User.exists({ $or: [{ username }] });
  if (exists) {
    return res.status(400).render("user/join", {
      pageTitle,
      errorMessage: "! This username is already taken.",
    });
  }
  if (password !== password2) {
    return res.status(400).render("user/join", {
      pageTitle,
      errorMessage: "! Password confirmation does not match.",
    });
  }

  try {
    const newUser = await User.create({
      password,
      username,
    });
    console.log("userCreated!!", newUser);
    return res.redirect("/user/login");
  } catch (error) {
    return res.status(400).render("join", {
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
