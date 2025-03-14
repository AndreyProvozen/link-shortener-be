import express from "express";
import linkRouter from "./routes/link.routes.js";
import authRouter from "./routes/auth.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import { RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS } from "./constants/global.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const limiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX_REQUESTS,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

app.use("/api", linkRouter);
app.use("/api", authRouter);
app.use("/api", redirectRoutes);

app.use(errorMiddleware);

export default app;
