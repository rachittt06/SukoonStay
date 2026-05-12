import crypto from "crypto";
import Razorpay from "razorpay";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

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

const getRazorpay = () => {
    const key_id = process.env.RAZORPAY_KEY;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_id || !key_secret) {
        throw new Error("Razorpay is not configured (RAZORPAY_KEY / RAZORPAY_KEY_SECRET)");
    }
    return new Razorpay({ key_id, key_secret });
};

const computeStayTotal = (roomData, checkInDate, checkOutDate) => {
    let totalPrice = roomData.pricePerNight;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut - checkIn;
    const nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
    totalPrice *= nights;
    return { totalPrice, nights };
};

export const createPaymentOrder = async (req, res) => {
    try {
        console.log("createPaymentOrder called with body:", req.body);
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user.id;

        console.log("User ID:", user);
        console.log("Room ID:", room);
        console.log("Check-in:", checkInDate, "Check-out:", checkOutDate, "Guests:", guests);

        if (!room || !checkInDate || !checkOutDate || guests == null) {
            console.log("Missing booking details");
            return res.status(400).json({
                success: false,
                message: "Missing booking details",
            });
        }

        if (new Date(checkOutDate) <= new Date(checkInDate)) {
            return res.json({ success: false, message: "Invalid date range" });
        }

        const isAvailable = await checkAvailibility({
            checkInDate,
            checkOutDate,
            room,
        });
        if (!isAvailable) {
            return res.json({
                success: false,
                message: "Room is not available",
            });
        }

        const roomData = await Room.findById(room);
        if (!roomData) {
            return res.json({ success: false, message: "Room not found" });
        }

        const { totalPrice } = computeStayTotal(roomData, checkInDate, checkOutDate);
        const amountPaise = Math.round(totalPrice * 100);
        if (amountPaise < 100) {
            return res.json({
                success: false,
                message: "Amount too low for Razorpay (min ₹1)",
            });
        }

        const razorpay = getRazorpay();
        const order = await razorpay.orders.create({
            amount: amountPaise,
            currency: "INR",
            receipt: `rcpt_${Date.now()}_${String(user).slice(-8)}`,
            notes: {
                userId: String(user),
                roomId: String(room),
            },
        });

        return res.json({
            success: true,
            order: {
                id: order.id,
                amount: Number(order.amount),
                currency: order.currency,
            },
            key: process.env.RAZORPAY_KEY,
            totalPrice,
        });
    } catch (error) {
        console.error("createPaymentOrder error:", error);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to create payment order",
        });
    }
};

export const verifyPaymentAndBook = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            room,
            checkInDate,
            checkOutDate,
            guests,
        } = req.body;

        const user = req.user.id;
        const secret = process.env.RAZORPAY_KEY_SECRET;
        if (!secret) {
            return res.status(500).json({
                success: false,
                message: "Razorpay is not configured",
            });
        }

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Missing payment details",
            });
        }

        const expected = crypto
            .createHmac("sha256", secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (expected !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            });
        }

        if (new Date(checkOutDate) <= new Date(checkInDate)) {
            return res.json({ success: false, message: "Invalid date range" });
        }

        const isAvailable = await checkAvailibility({
            checkInDate,
            checkOutDate,
            room,
        });
        if (!isAvailable) {
            return res.json({
                success: false,
                message: "Room is no longer available",
            });
        }

        const roomData = await Room.findById(room);
        if (!roomData) {
            return res.json({ success: false, message: "Room not found" });
        }

        const { totalPrice } = computeStayTotal(roomData, checkInDate, checkOutDate);
        const expectedAmountPaise = Math.round(totalPrice * 100);

        const razorpay = getRazorpay();
        const order = await razorpay.orders.fetch(razorpay_order_id);
        const orderAmount = Number(order.amount);

        if (orderAmount !== expectedAmountPaise) {
            return res.status(400).json({
                success: false,
                message: "Order amount mismatch",
            });
        }

        await Booking.create({
            user,
            room,
            hotel: roomData.hotel,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
            isPaid: true,
            paymentMethod: "Razorpay",
            status: "confirmed",
        });

        return res.json({
            success: true,
            message: "Payment successful. Booking confirmed.",
        });
    } catch (error) {
        console.error("verifyPaymentAndBook", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Payment verification failed",
        });
    }
};
