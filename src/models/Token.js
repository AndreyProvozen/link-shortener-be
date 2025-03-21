import { Schema, model } from "mongoose";

const Token = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
  },
  { versionKey: false }
);

export default model("Token", Token);
