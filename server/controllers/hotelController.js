import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;

        // ✅ auth check (safety)
        if (!req.auth?.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const owner = req.auth.userId;

        // ✅ check existing hotel
        const existingHotel = await Hotel.findOne({ owner });

        if (existingHotel) {
            return res.json({
                success: false,
                message: "You have already registered a hotel"
            });
        }

        // ✅ create hotel
        const newHotel = await Hotel.create({
            name,
            address,
            city,
            contact,
            owner
        });

        // ✅ update user role (safe)
        await User.findOneAndUpdate(
            { clerkId: owner },
            { role: "hotelOwner" },
            { new: true }
        );

        res.json({
            success: true,
            message: "Hotel registered successfully",
            hotel: newHotel   // optional but useful
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};