import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    try {
        const header = req.headers.authorization || "";
        const token = header.startsWith("Bearer ") ? header.slice(7) : null;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized"
            });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ success: false, message: "JWT_SECRET not configured" });
        }

        const decoded = jwt.verify(token, secret);
        req.user = { id: decoded.id, role: decoded.role };

        // Optional: attach user document for convenience
        req.userDoc = await User.findById(decoded.id);
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};