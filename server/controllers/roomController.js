import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import User from "../models/User.js";

const buildRoomResponse = async (roomDoc) => {
    const room = roomDoc?.toObject ? roomDoc.toObject() : roomDoc;
    if (!room) return null;

    const hotelDoc = await Hotel.findOne({ owner: room.hotel });
    const ownerDoc = await User.findById(room.hotel);

    const hotel = hotelDoc
        ? {
            _id: hotelDoc._id,
            name: hotelDoc.name,
            address: hotelDoc.address,
            contact: hotelDoc.contact,
            city: hotelDoc.city,
            owner: ownerDoc
                ? {
                    _id: String(ownerDoc._id),
                    name: ownerDoc.username,
                    userName: ownerDoc.username,
                    image: ownerDoc.image
                }
                : undefined
        }
        : undefined;

    return {
        ...room,
        hotel
    };
};

// create room
export const createRoom = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const { roomType, pricePerNight, amenities, images } = req.body;

        if (!roomType || !pricePerNight) {
            return res.status(400).json({ success: false, message: "roomType and pricePerNight are required" });
        }

        const hotel = await Hotel.findOne({ owner: req.user.id });

        if (!hotel) {
            return res.json({ success: false, message: "No hotel found" });
        }

        const parsedAmenities =
            typeof amenities === "string"
                ? JSON.parse(amenities)
                : amenities;

        const parsedImages =
            typeof images === "string"
                ? JSON.parse(images)
                : images;

        const normalizedImages = Array.isArray(parsedImages)
            ? parsedImages
                .map((img) => String(img || "").trim())
                .filter(Boolean)
            : [];

        if (!normalizedImages.length) {
            return res.status(400).json({ success: false, message: "At least one image URL is required" });
        }

        await Room.create({
            hotel: hotel.owner,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: Array.isArray(parsedAmenities) ? parsedAmenities : [],
            images: normalizedImages,
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
        const rooms = await Room.find({ isAvailable: true }).sort({ createdAt: -1 });
        const shaped = await Promise.all(rooms.map(buildRoomResponse));
        res.json({ success: true, rooms: shaped.filter(Boolean) });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// get owner rooms
export const getOwnerRooms = async (req, res) => {
    try {
        const hotelData = await Hotel.findOne({ owner: req.user.id });

        if (!hotelData) {
            return res.json({ success: false, message: "No hotel found" });
        }

        const rooms = await Room.find({ hotel: hotelData.owner });
        const shaped = await Promise.all(rooms.map(buildRoomResponse));
        res.json({ success: true, rooms: shaped.filter(Boolean) });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// get single room (public)
export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ success: false, message: "Room not found" });
        const shaped = await buildRoomResponse(room);
        res.json({ success: true, room: shaped });
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