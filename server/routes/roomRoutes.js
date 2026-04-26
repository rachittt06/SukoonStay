import express from "express";
import { requireAuth } from "@clerk/express";
import Room from "../models/Room.js";

const router = express.Router();

// CREATE ROOM
router.post("/", requireAuth(), async (req, res) => {
  try {
    const { hotelId, name, price, images } = req.body;

    const room = await Room.create({
      hotelId,
      name,
      price,
      images
    });

    res.json({
      success: true,
      message: "Room created successfully",
      room
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;