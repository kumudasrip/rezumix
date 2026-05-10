import { connectDB } from "@/db/connectDB"
import resumeModel from "@/models/resume.model";
import axios from "axios";
import mammoth from "mammoth";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const resumeId = searchParams.get("id");

        const resumeRecord = await resumeModel.findById(resumeId);

        if (!resumeRecord) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        const fileUrl = resumeRecord.resumeUrl;
        const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
        const buffer = Buffer.from(response.data);
        const result = await mammoth.convertToHtml({ buffer });

        return NextResponse.json({ success: true, resumeHtml: result.value });

    } catch (error) {
        console.error("error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
