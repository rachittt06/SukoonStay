import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

import userRoutes from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

import connectCloudinary from "./configs/cloudinary.js";

// Models (optional test)
import Test from "./models/Test.js";
import User from "./models/User.js";

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());

// ❌ IMPORTANT: webhook ke liye json use nahi hoga
// isliye webhook route JSON se pehle define karo

// ✅ CLERK WEBHOOK (FIXED)
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// ✅ normal APIs ke liye json
app.use(express.json());

// ================= DB =================
connectDB()
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

connectCloudinary();

// ================= TEST APIs =================

// CREATE
app.post("/add", async (req, res) => {
  try {
    const data = await Test.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// READ
app.get("/all", async (req, res) => {
  try {
    const data = await Test.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// UPDATE
app.put("/update/:id", async (req, res) => {
  try {
    const data = await Test.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ================= USER APIs =================

app.post("/add-user", async (req, res) => {
  try {
    const data = await User.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

app.get("/users", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

app.delete("/delete-user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ================= MAIN ROUTES =================

// ✅ Clerk middleware ONLY here
app.use("/api/user", clerkMiddleware(), userRoutes);
app.use("/api/hotels", clerkMiddleware(), hotelRoutes);
app.use("/api/rooms", clerkMiddleware(), roomRoutes);

// ================= HOME =================
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// ================= SERVER =================
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

export default app;