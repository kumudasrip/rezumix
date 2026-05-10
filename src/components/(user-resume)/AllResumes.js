'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion'
import { FileText, ArrowLeft, Copy, Check, Loader2, Calendar, Mail, Search } from 'lucide-react'
import { toast } from 'sonner'

// --- Components ---

// 1. Spotlight Card (Interactive Card)
function SpotlightCard({ children, className = "", onClick }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            onClick={onClick}
            className={`relative border border-white/10 bg-[#0A0A0A] overflow-hidden group ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.1),
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
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-sky-600/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-full h-[60vh] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen" />
    </div>
);

// --- Main Component ---

const AllResumes = () => {
    const [resumes, setResumes] = useState([])
    const [filteredResumes, setFilteredResumes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedResume, setSelectedResume] = useState(null)
    const [copied, setCopied] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    // Fetch Resumes
    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const res = await axios.get('/api/analyze-resume')
                setResumes(res.data.resumes || [])
                setFilteredResumes(res.data.resumes || [])
            } catch (err) {
                setError("Failed to fetch resumes")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchResumes()
    }, [])

    // Filter Logic
    useEffect(() => {
        const results = resumes.filter(resume =>
            resume.userEmail?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredResumes(results);
    }, [searchTerm, resumes]);

    // View Resume Detail
    const handleViewResume = async (resumeId) => {
        try {
            // Optimistic UI update or loading state could go here
            const res = await axios.get(`/api/analyze-resume/get-resume-content?id=${resumeId}`);
            setSelectedResume({ id: resumeId, value: res.data.resumeHtml });
        } catch (error) {
            console.error("Failed to load resume content:", error.message);
            toast.error("Could not load resume. Please try again.");
        }
    }

    // Copy Content
    const handleCopy = () => {
        if (!selectedResume) return;
        // Strip HTML tags for cleaner text copy
        const textContent = selectedResume.value.replace(/<[^>]+>/g, '\n').trim();

        navigator.clipboard.writeText(textContent).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            toast.success("Resume content copied!");
        });
    }

    return (
        <div className="relative min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-sky-500/30 overflow-x-hidden p-6 md:p-10">

            <GridBackground />

            <div className="relative z-10 max-w-7xl mx-auto">

                <AnimatePresence mode="wait">
                    {selectedResume ? (
                        /* --- DETAIL VIEW --- */
                        <motion.div
                            key="resume-view"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            {/* Header Toolbar */}
                            <div className="sticky top-0 z-20 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setSelectedResume(null)}
                                        className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                    >
                                        <ArrowLeft size={20} />
                                    </button>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Resume Preview</h2>
                                        <p className="text-xs text-slate-500">Viewing details</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCopy}
                                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-sky-900/20"
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                    {copied ? "Copied" : "Copy Text"}
                                </button>
                            </div>

                            {/* Content Area */}
                            <div className="p-8 md:p-12 bg-[#050505] min-h-[60vh]">
                                <div
                                    className="prose prose-invert max-w-4xl mx-auto prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white"
                                    dangerouslySetInnerHTML={{ __html: selectedResume.value }}
                                />
                            </div>
                        </motion.div>
                    ) : (
                        /* --- LIST VIEW --- */
                        <motion.div
                            key="resume-list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            {/* Header Section */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Resume Registry</h1>
                                    <p className="text-slate-400">Manage and review all uploaded resumes.</p>
                                </div>

                                {/* Search Bar */}
                                <div className="relative w-full md:w-72">
                                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Search by email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Content Grid */}
                            {loading ? (
                                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                                    <Loader2 className="w-8 h-8 animate-spin mb-4 text-sky-500" />
                                    <p>Loading registry...</p>
                                </div>
                            ) : error ? (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
                                    {error}
                                </div>
                            ) : filteredResumes.length === 0 ? (
                                <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
                                    <p className="text-slate-400 mb-2">No resumes found.</p>
                                    <p className="text-sm text-slate-500">Upload a resume to see it here.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredResumes.map((resume, index) => (
                                        <SpotlightCard
                                            key={resume._id || index}
                                            className="rounded-2xl p-6 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300"
                                            onClick={() => { }} // Optional: Make whole card clickable if desired
                                        >
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                                                    <FileText size={24} />
                                                </div>
                                                <span className="text-xs font-mono text-slate-600 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                                    DOCX
                                                </span>
                                            </div>

                                            <div className="mb-6 flex-grow">
                                                <div className="flex items-center gap-2 text-slate-300 mb-1 group">
                                                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                                                    <h3 className="font-semibold text-sm truncate w-full" title={resume.userEmail}>
                                                        {resume.userEmail || "Unknown User"}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-500 text-xs">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>
                                                        {new Date(resume.createdAt).toLocaleDateString('en-GB', {
                                                            day: 'numeric', month: 'short', year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleViewResume(resume._id)}
                                                className="w-full py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                                            >
                                                View Details
                                            </button>
                                        </SpotlightCard>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default AllResumes