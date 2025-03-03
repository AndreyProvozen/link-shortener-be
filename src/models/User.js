import { Schema, model } from "mongoose";
import { EMAIL_REGEXP } from "../constants/regexp.js";

const User = new Schema(
  {
    name: { type: String },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
      validate: {
        validator: value => EMAIL_REGEXP.test(value),
        message: "Invalid email format",
      },
    },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    image: { type: String },
    userLinks: [{ type: String }],
  },
  { timestamps: true, versionKey: false }
);

export default model("User", User);
