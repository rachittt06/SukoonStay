import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    createPaymentOrder,
    verifyPaymentAndBook,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", protect, createPaymentOrder);
console.log("Payment routes loaded");
router.post("/verify", protect, verifyPaymentAndBook);

export default router;
