import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

const shapeBooking = async (bookingDoc) => {
    const booking = bookingDoc?.toObject ? bookingDoc.toObject() : bookingDoc;
    if (!booking) return null;

    const [roomDoc, hotelDoc, userDoc, ownerDoc] = await Promise.all([
        Room.findById(booking.room),
        Hotel.findOne({ owner: booking.hotel }),
        User.findById(booking.user),
        User.findById(booking.hotel),
    ]);

    const room = roomDoc
        ? {
            ...roomDoc.toObject(),
            hotel: hotelDoc
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
                : undefined
        }
        : undefined;

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

    const user = userDoc
        ? {
            _id: String(userDoc._id),
            name: userDoc.username,
            userName: userDoc.username,
            image: userDoc.image
        }
        : { _id: booking.user, userName: "Guest" };

    return {
        ...booking,
        hotel,
        room,
        user,
        paymentStatus: booking.isPaid ? "Paid" : "Pending"
    };
};

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

        const user = req.user.id;

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
        const user = req.user.id;

        const bookings = await Booking.find({ user })
            .sort({ createdAt: -1 }); // ❌ removed populate

        const shaped = await Promise.all(bookings.map(shapeBooking));
        res.json({ success: true, bookings: shaped.filter(Boolean) });

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
        const hotel = await Hotel.findOne({ owner: req.user.id });

        if (!hotel) {
            return res.json({
                success: false,
                message: "No hotel found"
            });
        }

        const bookings = await Booking.find({ hotel: hotel.owner }).sort({ createdAt: -1 });
        const shapedBookings = (await Promise.all(bookings.map(shapeBooking))).filter(Boolean);

        const totalBookings = shapedBookings.length;

        const totalRevenue = shapedBookings.reduce(
            (acc, booking) => acc + booking.totalPrice,
            0
        );

        res.json({
            success: true,
            dashboardData: {
                totalBookings,
                totalRevenue,
                bookings: shapedBookings
            }
        });

    } catch (error) {
        res.json({
            success: false,
            message: "Failed to fetch bookings"
        });
    }
};