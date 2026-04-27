import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, default: "" },

    passwordHash: { type: String, required: false },

    role: {
        type: String,
        enum: ['user', 'hotelOwner'],
        default: 'user'
    },

    recentSearchedCities: {
        type: [String],
        default: []   // ✅ FIX (important)
    },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;