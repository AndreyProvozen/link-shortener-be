import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    image: { type: String },
    clicked: { type: Number, default: 0 },
    provider: { type: String },
    userLinks: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("User", User);
