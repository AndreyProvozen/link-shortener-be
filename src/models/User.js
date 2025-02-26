import { Schema, model } from "mongoose";
import { EMAIL_REGEXP } from "../constants/regexp";

const User = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      index: true,
      validate: {
        validator: (value) => EMAIL_REGEXP.test(value),
        message: "Invalid email format",
      },
    },
    image: { type: String },
    clicked: { type: Number, default: 0, min: 0 },
    provider: { type: String },
    userLinks: [{ type: String }],
  },
  { timestamps: true, versionKey: false }
);

export default model("User", User);
