import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";

// create room
export const createRoom = async (req, res) => {
    try {
        if (!req.auth?.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const { roomType, pricePerNight, amenities } = req.body;

        const hotel = await Hotel.findOne({ owner: req.auth.userId });

        if (!hotel) {
            return res.json({ success: false, message: "No hotel found" });
        }

        // upload images
        const uploadImages = (req.files || []).map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        });

        const images = await Promise.all(uploadImages);

        await Room.create({
            hotel: hotel.owner,   // ✅ FIXED (String)
            roomType,
            pricePerNight: +pricePerNight,
            amenities:
                typeof amenities === "string"
                    ? JSON.parse(amenities)
                    : amenities,
            images,
        });

        res.json({ success: true, message: "Room created successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// get all rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true })
            .sort({ createdAt: -1 }); // ❌ removed populate

        res.json({ success: true, rooms });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// get owner rooms
export const getOwnerRooms = async (req, res) => {
    try {
        const hotelData = await Hotel.findOne({ owner: req.auth.userId });

        if (!hotelData) {
            return res.json({ success: false, message: "No hotel found" });
        }

        const rooms = await Room.find({
            hotel: hotelData.owner   // ✅ FIXED (String match)
        });

        res.json({ success: true, rooms });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// toggle availability
export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body;

        const roomData = await Room.findById(roomId);

        if (!roomData) {
            return res.json({ success: false, message: "Room not found" });
        }

        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();

        res.json({ success: true, message: "Room availability Updated" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};