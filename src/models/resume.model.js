import mongoose from "mongoose"

const resumeSchema = mongoose.Schema({
    resumeUrl: {
        type: String
    },
    userEmail: {
        type: String
    }
}, { timestamps: true });

export default mongoose.models.Resume || mongoose.model("Resume", resumeSchema);