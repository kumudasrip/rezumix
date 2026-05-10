import { connectDB } from "@/db/connectDB";
import mockInterviewModel from "@/models/mockInterview.model";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDB()

        const mockInterviews = await mockInterviewModel.find()

        if (!mockInterviews) {
            return NextResponse.json({ error: "mock interviews not found" }, { status: 400 })
        }

        return NextResponse.json({ message: "mock interviews fetched successfully", mockInterviews }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "error while fethcing mock interviews" }, { status: 500 })
    }
}