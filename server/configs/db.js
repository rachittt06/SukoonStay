import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "hotel-booking",
    });

    console.log("Database Connected ✅");
  } catch (error) {
    console.log("DB Error ❌", error.message);
  }
};

export default connectDB;