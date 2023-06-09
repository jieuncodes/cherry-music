import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  password: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  profilePicPath: { type: String },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
  playingPlayListQueue: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Track" },
  ],
  generatedPlayLists: [
    { type: mongoose.Schema.Types.ObjectId, ref: "PlayList" },
  ],
  // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
