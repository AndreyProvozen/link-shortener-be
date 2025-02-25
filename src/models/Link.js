import { Schema, model } from "mongoose";
import { nanoid } from "nanoid";

const Link = new Schema(
  {
    url: { type: String, required: true },
    code: { type: String, default: () => nanoid(7), required: true },
    clicked: { type: Number, default: 0 },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default model("Link", Link);
