import { connectDB } from "@/db/connectDB"
import { sendOTPEmail } from "@/lib/mail"
import OTPModel from "@/models/OTPModel"
import userModel from "@/models/userModel"
import { NextResponse } from "next/server"


export async function POST(req, res) {
    try {
        const { fullName, email, password } = await req.json()

        if (!fullName || !email || !password) {
            return NextResponse.json({ message: "all fields are required" }, { status: 400 })
        }

        await connectDB()

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return NextResponse.json({ message: "user already exist" }, { status: 404 })
        }
        const user = await userModel.create({
            fullName,
            email,
            password
        })

        if (!user) {
            return NextResponse.json({ message: "error while registring user" }, { status: 400 })
        }

        const otp = Math.floor(100000 + Math.random() * 900000);


        const otpSave = await OTPModel.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        })

        if (!otpSave) {
            return NextResponse.json({ message: "error while saving otp" }, { status: 400 })
        }

        const sendOTP = await sendOTPEmail(email, otp)

        if (!sendOTP) {
            console.log("error while sending otp", sendOTP)
            return NextResponse.json({ message: "error while sending otp" }, { status: 400 })
        }

        return NextResponse.json({ success: true, message: "Use registered successfully", user }, { status: 200 })
    } catch (error) {
        console.log("error: ", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }

}