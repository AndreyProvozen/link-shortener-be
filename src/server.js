import dotenv from "dotenv";
import app from "./app.js";
import connectMongoDB from "./config/connectMongoDB.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectMongoDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Server startup error:", error);
  }
};

startServer();
