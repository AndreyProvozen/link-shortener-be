import { Schema, model } from "mongoose";

const User = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, trim: true, lowercase: true },
    image: { type: String },
    clicked: { type: Number, default: 0 },
    provider: { type: String },
    userLinks: [{ type: String }],
  },
  { timestamps: true }
);

export default model("User", User);
