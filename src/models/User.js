import { Schema, model } from "mongoose";

const User = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    image: { type: String },
    userLinks: [{ type: String }],
  },
  { timestamps: true, versionKey: false }
);

export default model("User", User);
