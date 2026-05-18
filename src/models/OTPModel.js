import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    // Tracks the exact moment an OTP was last sent – used for cooldown checks across tabs
    lastSentAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true, // creates createdAt / updatedAt
});

// TTL index – automatically removes docs when expiresAt is in the past
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.OTP || mongoose.model("OTP", OTPSchema);