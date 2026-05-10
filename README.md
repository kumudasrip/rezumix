Got it! Here's your **final, polished `README.md` file** for **Rezumix**, written in a **clean, professional**, and **detailed** format — without any mention of Multer or backend separation. It includes everything in one file as requested: setup, routes, Gemini logic, architecture, prompts, roadmap, screenshots (placeholder), license, and more.

---

```markdown
# 🚀 Rezumix – AI-Powered Resume & Personality Analyzer

**Rezumix** is a full-stack AI-based application that analyzes user resumes and questionnaire responses to predict personality traits using **Google's Gemini API**. It provides users with detailed insights based on the **OCEAN personality model**, along with personalized career paths and skill recommendations.

Built entirely with the **latest version of Next.js (App Router)** and styled using **Tailwind CSS**, Rezumix provides a smooth, modern, and responsive user experience.

---

## 📦 Key Features

- 📄 Resume Upload and Text Extraction
- 🤖 AI-Powered Personality Analysis (Resume + Questionnaire)
- 📊 Interactive OCEAN Personality Reports
- 🧭 Career and Skill Recommendations
- 🔐 JWT-Based User Authentication
- 🎯 Modular Codebase (API, Components, Models, Utils)
- 💡 Gemini API Integration for Dynamic Prompting
- 🎨 Clean and Animated UI (Framer Motion + Tailwind)

---

## 🗂️ Project Structure

```
rezumix/
├── app/
│   ├── layout.js                    # App layout wrapper
│   ├── page.js                      # Landing/home page
│   ├── dashboard/                   # Authenticated user dashboard
│   ├── upload/                      # Resume upload and handling
│   ├── questionnaire/              # Personality test interface
│   ├── result/                      # Personality report and insights
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   └── register/route.js
│   │   ├── resume/
│   │   │   ├── upload/route.js
│   │   │   └── analyze/route.js
│   │   ├── questionnaire/
│   │   │   ├── submit/route.js
│   │   │   └── sample/route.js
│   │   └── personality/
│   │       ├── report/route.js
│   │       └── tips/route.js
│   └── components/                  # Reusable React components
├── lib/
│   ├── db.js                        # MongoDB connection utility
│   ├── gemini.js                    # Gemini API functions
│   └── utils.js                     # Token generation, validation, etc.
├── models/
│   ├── User.js                      # Mongoose model for user
│   ├── Report.js                    # Mongoose model for personality report
│   └── Questionnaire.js             # Model for user responses
├── public/                          # Static assets (icons, screenshots)
├── styles/                          # Tailwind and custom CSS
├── .env.local                       # Environment variables
├── next.config.js
└── README.md
```

---

## ⚙️ Installation Guide

### 1. Clone the Repo

```bash
git clone https://github.com/thedevanshagrawal/rezumix.git
cd rezumix
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create a `.env.local` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_USER=
EMAIL_PASS=
JWT_SECRET=your_jwt_secret=
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the App Locally

```bash
npm run dev
```

---

## 📌 API Routes Overview (`/app/api/`)

### 🔐 Auth Routes

| Method | Route                  | Description              |
|--------|------------------------|--------------------------|
| POST   | `/api/auth/register`   | Register new user        |
| POST   | `/api/auth/login`      | Authenticate + JWT token |

---

### 📄 Resume Analysis

| Method | Route                   | Description                        |
|--------|-------------------------|------------------------------------|
| POST   | `/api/resume/upload`    | Accept base64 PDF                  |
| POST   | `/api/resume/analyze`   | Analyze resume content using Gemini|

---

### 🧠 Questionnaire Routes

| Method | Route                           | Description                       |
|--------|----------------------------------|-----------------------------------|
| GET    | `/api/questionnaire/sample`     | Fetch Gemini-generated questions  |
| POST   | `/api/questionnaire/submit`     | Submit user answers for analysis  |

---

### 📊 Personality Report

| Method | Route                        | Description                        |
|--------|------------------------------|------------------------------------|
| GET    | `/api/personality/report`    | Fetch user’s report & scores       |
| GET    | `/api/personality/tips`      | Gemini-generated improvement tips  |

---

## 🧠 Personality Analysis Logic

### Resume-Based Flow:

1. User uploads resume (PDF → base64).
2. Text is extracted from the file.
3. Gemini API receives the extracted text + structured prompt.
4. AI returns OCEAN scores, explanation, job/career fit, etc.
5. Result is saved to the DB and visualized in the report page.

### Questionnaire-Based Flow:

1. User answers 8–10 behavioral/psychological questions.
2. The entire set of responses is formatted as a narrative.
3. Gemini API receives prompt with user’s responses.
4. Output includes personality scores, descriptions, and advice.
5. Stored and visualized in the dashboard/report section.

---

## ✨ Sample Gemini Prompt

```text
Analyze the following resume content and predict the user's Big Five (OCEAN) personality traits.

Resume:
"Full-stack developer with 3 years of experience in building scalable systems. Passionate about collaboration and solving real-world problems..."

Instructions:
- Return trait values (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) as decimal scores (0.0 - 1.0).
- Explain each trait in one line.
- Suggest 3 career paths and 3 skills to develop.

Format:
{
  "Openness": 0.83,
  "Conscientiousness": 0.78,
  ...
}
```

---

## 🔐 Authentication

- Uses **JWT tokens** stored in **HTTP-only cookies**
- Passwords hashed using `bcrypt`
- Middleware checks for authenticated access to protected routes
- Clean separation of login, register, and token logic in `/api/auth`

---

## 📈 Future Roadmap

- 🎙️ Add voice input for questionnaire
- 💬 Introduce AI chat support with emotional memory
- 🧑‍🎨 Add animated avatar for AI interaction
- 📥 Allow export of report as PDF
- 📱 Build a mobile app (React Native)
- 🗺️ Multilingual support (i18n)


---

## 👤 Author

**Devansh Agrawal**  
🎓 B.Tech CSE, The ICFAI University, Raipur  
🧠 Full Stack & AI Developer  
🔗 [LinkedIn](https://www.linkedin.com/in/thedevanshagrawal/)  
💻 GitHub: [@thedevanshagrawal](https://github.com/thedevanshagrawal)  
📧 Email: agrawaldevansh27@gmail.com

---

## 📄 License

This project is licensed under the **MIT License**.  
You're free to use, modify, and distribute — just give credit!

---

## ✅ Conclusion

**Rezumix** combines the power of **AI** with intuitive **design** to help users unlock their personality traits, identify strengths, and find the best career fit based on who they truly are. Whether you're a student, job seeker, or HR professional, **Rezumix** provides actionable insights in seconds.

> _“Your personality. Your potential. Rezumix.”_
