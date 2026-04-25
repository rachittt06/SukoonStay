import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// check availability
const checkAvailibility = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },
        });

        return bookings.length === 0;

    } catch (error) {
        console.error(error.message);
        return false;
    }
};

// check availability API
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;

        const isAvailable = await checkAvailibility({
            checkInDate,
            checkOutDate,
            room
        });

        res.json({ success: true, isAvailable });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// create booking
export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;

        const user = req.auth.userId; // ✅ FIXED

        // validate dates
        if (new Date(checkOutDate) <= new Date(checkInDate)) {
            return res.json({ success: false, message: "Invalid date range" });
        }

        // check availability
        const isAvailable = await checkAvailibility({
            checkInDate,
            checkOutDate,
            room
        });

        if (!isAvailable) {
            return res.json({
                success: false,
                message: "Room is not available"
            });
        }

        // get room data
        const roomData = await Room.findById(room);

        if (!roomData) {
            return res.json({ success: false, message: "Room not found" });
        }

        let totalPrice = roomData.pricePerNight;

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut - checkIn;

        const nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
        totalPrice *= nights;

        // create booking
        await Booking.create({
            user,
            room,
            hotel: roomData.hotel, // ✅ string
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        });

        res.json({
            success: true,
            message: "Booking created successfully"
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to create booking"
        });
    }
};

// get user bookings
export const getUserBookings = async (req, res) => {
    try {
        const user = req.auth.userId; // ✅ FIXED

        const bookings = await Booking.find({ user })
            .sort({ createdAt: -1 }); // ❌ removed populate

        res.json({ success: true, bookings });

    } catch (error) {
        res.json({
            success: false,
            message: "Failed to fetch bookings"
        });
    }
};

// get hotel bookings
export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.auth.userId }); // ✅ FIXED

        if (!hotel) {
            return res.json({
                success: false,
                message: "No hotel found"
            });
        }

        const bookings = await Booking.find({ hotel: hotel.owner }) // ✅ string match
            .sort({ createdAt: -1 });

        const totalBookings = bookings.length;

        const totalRevenue = bookings.reduce(
            (acc, booking) => acc + booking.totalPrice,
            0
        );

        res.json({
            success: true,
            dashboardData: {
                totalBookings,
                totalRevenue,
                bookings
            }
        });

    } catch (error) {
        res.json({
            success: false,
            message: "Failed to fetch bookings"
        });
    }
};