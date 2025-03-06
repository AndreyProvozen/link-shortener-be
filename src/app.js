import express from "express";
import linkRouter from "./routes/link.routes.js";
import authRouter from "./routes/auth.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

app.use("/api", linkRouter);
app.use("/api", authRouter);
app.use("/", redirectRoutes);

app.use(errorMiddleware);

export default app;
