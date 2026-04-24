import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";

// Models
import Test from "./models/Test.js";
import User from "./models/User.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB CONNECT
connectDB()
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// Clerk route
app.use("/api/clerk", clerkMiddleware(), clerkWebhooks);

// ================= TEST APIs =================

// 🟢 CREATE
app.post("/add", async (req, res) => {
  try {
    const data = await Test.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 🔵 READ
app.get("/all", async (req, res) => {
  try {
    const data = await Test.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 🟡 UPDATE
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

// 🔴 DELETE
app.delete("/delete/:id", async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ================= USER APIs =================

// 🟢 ADD USER
app.post("/add-user", async (req, res) => {
  try {
    const data = await User.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 🔵 GET USERS
app.get("/users", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 🔴 DELETE USER
app.delete("/delete-user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Home route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});
app.use('/api/user', userRouter)

// Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

export default app;