import User from "../models/User.js";

// GET /api/user/
export const getUserData = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            role: user.role,
            recentSearchedCities: user.recentSearchedCities || []
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// STORE user recently searched cities
export const storeRecentSearchedCities = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const { recentSearchedCities } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.recentSearchedCities) {
            user.recentSearchedCities = [];
        }

        if (user.recentSearchedCities.length < 3) {
            user.recentSearchedCities.push(recentSearchedCities);
        } else {
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCities);
        }

        await user.save();

        res.json({
            success: true,
            message: "City stored successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};