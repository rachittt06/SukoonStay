import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from "../controllers/roomController.js";
import upload from "../middleware/uploadMiddleware.js";

const roomRoutes = express.Router();

roomRoutes.post("/", protect, upload.array("images", 4), createRoom);
roomRoutes.get("/", getRooms);
roomRoutes.get("/owner", protect, getOwnerRooms);
roomRoutes.post("/toggle-availability", protect, toggleRoomAvailability);

export default roomRoutes;