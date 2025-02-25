import { connect } from "mongoose";

const connectMongoDB = async () => {
  try {
    await connect(process.env.MONGO_DB_URL);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectMongoDB;
