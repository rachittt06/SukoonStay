import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const userId = req.auth?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Not authorized"
            });
        }

        // ✅ Clerk ID se user fetch karo
        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user; // optional but useful
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};