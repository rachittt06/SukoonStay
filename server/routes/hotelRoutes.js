import express from "express";
import { requireAuth } from "@clerk/express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

router.post("/", requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth();
    const { name, phone, address, city } = req.body;

    const hotel = await Hotel.create({
      owner: userId,
      name,
      contact: phone,
      address,
      city
    });

    res.json({
      success: true,
      message: "Hotel saved successfully",
      hotel
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;