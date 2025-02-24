import mongoose from "mongoose";

const Link = new mongoose.Schema(
  {
    url: { type: String, required: true },
    code: { type: String, default: () => nanoid(7), required: true },
    title: { type: String, required: true },
    clicked: { type: Number, default: 0 },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("Link", Link);
