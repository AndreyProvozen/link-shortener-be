import express from "express";
import linkRouter from "./routes/link.routes.js";
import authRouter from "./routes/auth.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", linkRouter);
app.use("/api", authRouter);

app.use("/", redirectRoutes);

app.use(errorMiddleware);

export default app;
