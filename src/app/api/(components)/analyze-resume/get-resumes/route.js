import { connectDB } from "@/db/connectDB"
import resumeModel from "@/models/resume.model";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const userEmail = searchParams.get("userEmail");

        const resumeRecords = await resumeModel.find({ userEmail });

        if (!resumeRecords || resumeRecords.length === 0) {
            return NextResponse.json({ message: "No resumes found" }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            userResumes: resumeRecords.map(r => ({
                id: r._id,
                resumeUrl: r.resumeUrl
            }))
        }, { status: 200 });

    } catch (error) {
        console.error("error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
