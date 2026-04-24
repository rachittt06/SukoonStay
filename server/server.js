import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

const app = express();

// ✅ PUT IT HERE (before routes)
if (process.env.MONGODB_URI) {
  connectDB();
}

app.use(cors());
app.use(express.json());

// middleware
app.use(clerkMiddleware());

// routes
app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

export default (req, res) => app(req, res);