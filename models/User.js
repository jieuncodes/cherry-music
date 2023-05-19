import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  password: { type: String },
  username: { type: String, required: true, unique: true },
  profilePicPath: { type: String },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});
const User = mongoose.model("User", userSchema);
export default User;
