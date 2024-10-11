import mongoose from "mongoose";

const userScheme = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamp: true }
);

export default mongoose.model("users", userScheme);
