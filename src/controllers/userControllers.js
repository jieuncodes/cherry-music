import bcrypt from "bcrypt";
import User from "../../models/User.js";

export const getJoin = (req, res) => {
  return res.render("user/join", { pageTitle: "Join Cherry Music" });
};

export const postJoin = async (req, res) => {
  const pageTitle = "Join Cherry Music!";
  const { email, username, password, password2 } = req.body;

  let picFile = req.file;
  let noAvatar = false;
  if (!picFile) {
    picFile = {
      path: "/images/default_user_avatar.jpeg",
    };
    noAvatar = true;
  }

  const emailExists = await User.exists({ email  });
  if (emailExists) {
    return res.status(400).render("user/join", {
      pageTitle,
      error: {
        emailErrorMessage: "이미 가입된 이메일입니다.",
        field: "email",
      },
    });
  }
  const usernameExists = await User.exists({ username });
  if (usernameExists) {
    return res.status(400).render("user/join", {
      pageTitle,
      error: {
        usernameErrorMessage: "유저 아이디가 이미 사용되었습니다.",
        field: "username",
      },
    });
  }

  if (password !== password2) {
    return res.status(400).render("user/join", {
      pageTitle,
      passwordErrorMessage: "비밀번호가 일치하지 않습니다. ",
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
    console.log('errorMsg', error);

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
