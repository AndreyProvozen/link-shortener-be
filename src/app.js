import express from "express";
import postRouter from "./routes/post.routes.js";
import linkRouter from "./routes/link.routes.js";

const app = express();

app.use(express.json());

app.use("/api", postRouter);
app.use("/api", linkRouter);

export default app;
