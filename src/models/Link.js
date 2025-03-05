import { Schema, model } from "mongoose";

const Link = new Schema(
  {
    url: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, index: true },
    clicked: { type: Number, default: 0, min: 0 },
    metrics: [{ title: { type: String, required: true }, data: { type: Schema.Types.Mixed, default: [] } }],
  },
  { timestamps: true, versionKey: false }
);

export default model("Link", Link);
