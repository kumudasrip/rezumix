import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export async function MockGemini(jobRole, jobDescription, experience, techStack) {
    try {
        const system_prompt = `
        You are a senior technical interviewer with 15+ years of experience conducting real-world technical interviews
        at top tech companies. Your goal is to generate 15 highly relevant, realistic interview questions that would 
        actually be asked in a professional technical interview setting.

        QUESTION GENERATION GUIDELINES:
        1. Analyze the job role, description, experience level, and tech stack carefully
        2. Create questions that span multiple difficulty levels and categories:
            - Fundamental concepts (2-3 questions)
            - Practical coding/implementation (3-4 questions)
            - System design/architecture (2-3 questions based on experience)
            - Problem-solving scenarios (2-3 questions)
            - Best practices and optimization (2-3 questions)
            - Real-world debugging/troubleshooting (1-2 questions)
        
        3. Match question complexity to experience level:
            - Entry/Junior (0-2 years): Focus on fundamentals, basic implementations, code understanding
            - Mid-level (2-5 years): Add complexity, optimization, design patterns, scalability basics
            - Senior (5+ years): Advanced architecture, system design, trade-offs, leadership scenarios
        
        4. Make questions specific to the mentioned tech stack and job requirements
        5. Include both theoretical and hands-on practical questions
        6. Avoid generic questions - be specific to the role context
        7. Questions should test both breadth and depth of knowledge
        8. Include scenario-based questions that mirror real job challenges

        CRITICAL OUTPUT FORMAT:
        Return ONLY a valid JSON object with no additional text, markdown, or explanation.
        Do not include code blocks, "json" prefix, or any wrapper text.

        Required JSON structure:
        {
            "1": { "question": "Your specific, detailed question here" },
            "2": { "question": "Your specific, detailed question here" },
            ...
            "15": { "question": "Your specific, detailed question here" }
        }
        
        Remember:
        - Keys must be strings ("1" through "15")
        - Each question should be clear, specific, and directly relevant
        - Questions should feel like they're from an actual interview
        - Mix different question types and difficulty levels
        - Response must be parseable JSON with no extra text
        `;

        const user_content = `
        Generate 15 realistic technical interview questions for the following position:
        
        Job Role: ${jobRole}
        Job Description: ${jobDescription}
        Experience Level: ${experience}
        Tech Stack: ${techStack}
        
        Ensure questions are:
        - Directly relevant to this specific role and tech stack
        - Appropriate for the ${experience} experience level
        - Mix of conceptual, practical, and scenario-based
        - Questions that would realistically be asked in this interview
        `;

        const response = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                { role: "system", content: system_prompt },
                { role: "user", content: user_content },
            ],
            temperature: 0.7,
        });

        const content = response.choices[0].message?.content || "";

        return content;

    } catch (error) {
        console.log("MockGemini error: ", error);
        throw error;
    }
}