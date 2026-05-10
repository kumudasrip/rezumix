import { connectDB } from "@/db/connectDB"
import OTPModel from "@/models/OTPModel";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        await connectDB()
        const { email, otp } = await req.json();

        const record = await OTPModel.findOne({ email });

        if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
            return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
        }

        const user = await userModel.updateOne({ email }, { isVerified: true }, { upsert: true });

        if (!user) {
            return NextResponse.json({ message: "user not found" }, { status: 400 })
        }

        await OTPModel.deleteOne({ email });

        return NextResponse.json({ success: true, message: "Email verified successfully" }, { status: 200 });
    } catch (error) {
        console.log("error: ", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}
