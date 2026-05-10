export function extractResumeDetails(text) {
    const nameRegex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)+/;
    const nameMatch = text.match(nameRegex);
    const name = nameMatch ? nameMatch[0] : "Unknown";

    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phoneRegex = /(\+\d{1,3}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/g;
    const educationRegex = /(B\.?Tech|M\.?Tech|MBA|BSc|MSc|PhD|B\.E\.|M\.E\.)/gi;
    const educationMatch = text.match(educationRegex) || [];

    const skillsRegex = /(?:Skills:|Technical Skills:)(.+?)(?:\n\n|\n[A-Z]|$)/s;
    const skillsMatch = text.match(skillsRegex);
    const skills = skillsMatch ? skillsMatch[1].split(/[,\n]/).map(skill => skill.trim()) : [];

    const experienceRegex = /Experience(.+?)(?:\n\n[A-Z][a-z]+:|\n\n[A-Z][A-Z\s]+:|\n\n[A-Z]|$)/s;
    const experienceMatch = text.match(experienceRegex);
    const experience = experienceMatch ? experienceMatch[1].trim() : "";

    return {
        name,
        contact: {
            email: text.match(emailRegex) || [],
            phone: text.match(phoneRegex) || [],
        },
        education: educationMatch,
        skills,
        experience,
    };
}
