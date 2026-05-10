import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import userModel from "@/models/userModel";
import { connectDB } from "@/db/connectDB";

export async function POST(req) {
    try {
        await connectDB()
        const { passwordChange } = await req.json()

        const { searchParams } = new URL(req.url)
        const userEmail = searchParams.get('email')

        if (!passwordChange) {
            return NextResponse.json({ success: false, message: "new password us required" }, { status: 401 });
        }

        const hashedNewPassword = await bcrypt.hash(passwordChange.newPassword, 10)

        const newPassword = await userModel.findOneAndUpdate(
            { email: userEmail },
            { password: hashedNewPassword }
        ).select("-password");

        if (!newPassword) {
            return NextResponse.json({ success: false, message: "error while updating password" }, { status: 401 });
        }

        return NextResponse.json({ success: true, message: "Password updated successfully" }, { status: 200 })

    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}