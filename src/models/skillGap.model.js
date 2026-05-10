import mongoose from "mongoose"

const skillGapSchema = new mongoose.Schema(
    {
        resumeUrl: {
            type: String
        },
        jobRole: {
            type: String
        },
        jobSkill: {
            type: [String]
        },
        userEmail: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.models.SkillGap || mongoose.model("SkillGap", skillGapSchema)