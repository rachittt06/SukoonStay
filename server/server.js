import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

const app = express();

// DB
// if (process.env.MONGODB_URI) {
//   connectDB();
// }
if (process.env.MONGODB_URI) {
  await connectDB();
  console.log("DB CONNECTED ✅");
}

app.use(cors());
app.use(express.json());

// ✅ ONLY here
app.use("/api/clerk", clerkMiddleware(), clerkWebhooks);

// test route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

export default app;