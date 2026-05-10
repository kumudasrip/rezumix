import { connectDB } from "@/db/connectDB"
import mockInterviewModel from "@/models/mockInterview.model";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        await connectDB()

        const { searchParams } = new URL(req.url)
        const id = searchParams.get('Id')

        const interview = await mockInterviewModel.findOne({ _id: id })

        if (!interview) {
            return NextResponse.json({
                sucess: false, messgae: "interview not found"
            }, { status: 400 })
        }

        return NextResponse.json({
            sucess: true, messgae: "interview found", data: interview
        }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            sucess: false, messgae: "Server error"
        }, { status: 500 })
    }
}