import mongoose from "mongoose";

const mockInterviewSchema = mongoose.Schema(
    {
        jobRole: {
            type: String,
            required: true
        },
        jobDescription: {
            type: String,
            required: true
        },
        experience: {
            type: String,
            required: true
        },
        techStack: {
            type: String,
            required: true
        },
        geminiResponse: {
            type: Map,
            of: new mongoose.Schema({
                question: String,
                answer: String
            }),
            required: true
        },
        userEmail: {
            type: String
        }
    },
    { timestamps: true }
)

export default mongoose.models.MockInterview || mongoose.model("MockInterview", mockInterviewSchema)