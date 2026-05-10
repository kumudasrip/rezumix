import mongoose from "mongoose"

const OTPSchema = mongoose.Schema({
    email: {
        type: String
    },
    otp: {
        type: String
    },
    expiresAt: {
        type: Date
    },
}, {
    timestaps: true
})

export default mongoose.models.OTP || mongoose.model("OTP", OTPSchema);