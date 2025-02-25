import express from "express";
import linkRouter from "./routes/link.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use("/api", linkRouter);
app.use("/api", userRouter);

export default app;
