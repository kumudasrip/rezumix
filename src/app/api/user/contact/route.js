import { sendUserEmail } from "@/lib/contact-mail";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { useremail, name, message } = await req.json();

        if (!useremail || !name || !message) {
            return NextResponse.json(
                { success: false, error: "All fields are required" },
                { status: 400 }
            );
        }

        await sendUserEmail(useremail, name, message);
        return NextResponse.json({ success: true });

    } catch (err) {
        console.error("Contact API error:", err);
        return NextResponse.json(
            { success: false, error: "Failed to send email" },
            { status: 500 }
        );
    }
}