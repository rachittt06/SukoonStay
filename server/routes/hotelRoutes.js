import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerHotel } from "../controllers/hotelController.js";

const router = express.Router();

// Register hotel (matches frontend `HotelReg.jsx` payload: { name, phone, address, city })
router.post("/", protect, (req, res, next) => {
  // normalize `phone` -> `contact` expected by controller/model
  if (req.body?.phone && !req.body?.contact) {
    req.body.contact = req.body.phone;
  }
  return registerHotel(req, res, next);
});

export default router;