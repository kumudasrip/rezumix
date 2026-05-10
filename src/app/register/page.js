"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
    User,
    Mail,
    Lock,
    ArrowRight,
    Loader2,
    CheckCircle2,
    Sparkles,
    ShieldCheck,
    Star,
    ArrowLeft
} from "lucide-react";

// --- Components ---

// 1. Spotlight Card
function SpotlightCard({ children, className = "" }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`relative border border-white/10 bg-neutral-900/50 overflow-hidden group ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.1),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full z-10">{children}</div>
        </div>
    );
}

// 2. Background Pattern
const GridBackground = () => (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-full h-[60vh] bg-purple-600/5 blur-[120px] rounded-full mix-blend-screen" />
    </div>
);

// --- Main Page Component ---

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Animation state
    const [loaded, setLoaded] = useState(false);
    useEffect(() => setLoaded(true), []);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("/api/user/register", {
                fullName, email, password
            });

            if (response.status === 200) {
                setSuccess("Registration successful! Redirecting...");
                setFullName("");
                setEmail("");
                setPassword("");

                // Redirect to verify-otp after 2 seconds
                setTimeout(() => {
                    router.push("/verify-otp");
                }, 2000);
            }
        } catch (err) {
            if (err?.response?.status === 404) {
                setError("User already registered. Please log in.");
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const features = [
        "AI-Powered Resume Analysis",
        "Personalized Career Recommendations",
        "Mock Interview Practice",
        "Personality Prediction",
        "Skill Gap Identifier"
    ];

    return (
        <div className="relative min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">

            <GridBackground />

            <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 py-20">

                {/* Back Link */}
                <div className="max-w-6xl mx-auto w-full mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Homepage
                    </Link>
                </div>

                <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* LEFT SIDE: Marketing Content */}
                    <div className={`transition-all duration-1000 ease-out ${loaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>

                        {/* Animated Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-8">
                            <Sparkles className="w-3 h-3" />
                            <span>Join the AI Revolution</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                            Accelerate your career <br />
                            with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Intelligence.</span>
                        </h1>

                        <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-md">
                            Join thousands of professionals using Rezumix to analyze resumes, practice interviews, and land top-tier roles.
                        </p>

                        {/* Feature List */}
                        <div className="space-y-4 mb-12">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 text-slate-300"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-blue-500/80 flex-shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Social Proof */}
                        <div className="flex flex-wrap gap-6 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <ShieldCheck className="w-4 h-4 text-green-400" />
                                <span>50,000+ Resumes</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span>4.9/5 Rating</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Registration Form */}
                    <div className={`transition-all duration-1000 delay-100 ease-out ${loaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                        <SpotlightCard className="rounded-3xl p-8 md:p-10 shadow-2xl bg-[#0A0A0A] border border-white/10">

                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                                <p className="text-slate-400 text-sm">Start your free analysis today.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="John Doe"
                                            required
                                            className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@company.com"
                                            required
                                            className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Create a secure password"
                                            required
                                            className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Status Messages */}
                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                        {error}
                                    </div>
                                )}
                                {success && (
                                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-xs flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                        {success}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 mt-6 shadow-lg shadow-white/5 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Creating Account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Get Started</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Footer */}
                            <div className="mt-8 text-center pt-6 border-t border-white/5">
                                <p className="text-slate-400 text-sm">
                                    Already have an account?{" "}
                                    <Link href="/login" className="text-white font-medium hover:text-blue-400 transition-colors">
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </div>
        </div>
    );
}