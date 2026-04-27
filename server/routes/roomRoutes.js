import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createRoom,
  getRooms,
  getRoomById,
  getOwnerRooms,
  toggleRoomAvailability
} from "../controllers/roomController.js";

const router = express.Router();

// Public
router.get("/", getRooms);

// Owner (authenticated)
// IMPORTANT: put static routes before "/:id" (otherwise "owner" is treated as an id)
router.get("/owner", protect, getOwnerRooms);
router.post("/", protect, createRoom);
router.post("/toggle-availability", protect, toggleRoomAvailability);

// Public (by id) - keep this after static routes like "/owner"
router.get("/:id", getRoomById);

export default router;