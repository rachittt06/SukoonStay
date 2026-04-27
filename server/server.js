import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";

import userRoutes from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Models (optional test)
import Test from "./models/Test.js";
import User from "./models/User.js";

const app = express();

// ================= MIDDLEWARE =================
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  process.env.CLIENT_URL,
].filter(Boolean));

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (curl/postman) and configured frontend origins.
    if (!origin) return callback(null, true);
    if (allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));

// ✅ normal APIs ke liye json
app.use(express.json());

// ================= DB =================
connectDB()
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

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
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRouter);

// ================= HOME =================
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

export default app;