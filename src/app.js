import express from "express";
import linkRouter from "./routes/link.routes.js";

const app = express();

app.use(express.json());

app.use("/api", linkRouter);

export default app;
