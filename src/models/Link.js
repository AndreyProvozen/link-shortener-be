import { Schema, model } from "mongoose";
import { nanoid } from "nanoid";
import { LINK_REGEXP } from "../constants/regexp.js";

const Link = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => LINK_REGEXP.test(value),
        message: "Invalid URL format",
      },
    },
    code: {
      type: String,
      default: `ls-${nanoid(7)}`,
      required: true,
      unique: true,
      index: true,
    },
    clicked: { type: Number, default: 0, min: 0 },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, versionKey: false }
);

export default model("Link", Link);
