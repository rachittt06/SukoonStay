import mongoose from "mongoose";
import User from "../models/User.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "hotel-booking",
    });

    // Ensure Mongo indexes match current schemas and remove stale indexes.
    await User.syncIndexes();

    console.log("Database Connected ✅");
  } catch (error) {
    console.log("DB Error ❌", error.message);
    throw error;
  }
};

export default connectDB;