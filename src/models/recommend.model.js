import mongoose from "mongoose"

const recommendSchema = mongoose.Schema(
    {
        recommendUserName: {
            type: String
        },
        skills: {
            type: [String]
        },
        interests: {
            type: [String]
        },
        preferredWorkEnvironment: {
            type: String
        },
        timeCommitment: {
            type: Number
        }
    },
)

export default mongoose.models.Recommend || mongoose.model("Recommend", recommendSchema);