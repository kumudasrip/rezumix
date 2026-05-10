"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
    AlertTriangle, 
    NotebookText, 
    ChevronDown, 
    ChevronUp, 
    Loader2,
    Search,
    Calendar,
    Mail,
    Code,
    Clock,
    ShieldCheck
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

// 1. Grid Background (Indigo/Purple Theme)
const GridBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
    <div className="absolute top-0 left-0 w-full h-[60vh] bg-indigo-600/5 blur-[120px] rounded-full mix-blend-screen" />
    <div className="absolute bottom-0 right-0 w-full h-[60vh] bg-purple-600/5 blur-[120px] rounded-full mix-blend-screen" />
  </div>
);

// 2. Spotlight Card Component
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
      className={`relative border border-white/10 bg-[#0A0A0A] overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full z-10">{children}</div>
    </div>
  );
}

const AllMockInterviews = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const res = await apiClient.allMockInterview();
                setInterviews(res.mockInterviews || []);
            } catch (err) {
                setError('Failed to fetch mock interviews');
                console.error(err);
            } finally {
                setLoading(false);
                setTimeout(() => setIsVisible(true), 100);
            }
        };

        fetchInterviews();
    }, []);

    const toggleQuestions = (index) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mr-2" />
                <span>Loading interview records...</span>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
            <GridBackground />

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
                
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Admin Database</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Mock <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Interview Logs</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Review all generated interview sessions, questions, and answers stored in the system.
                    </p>
                </div>

                {/* Content Area */}
                <div className={`transition-all duration-700 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {error ? (
                        <div className="flex flex-col items-center justify-center p-8 border border-red-500/20 bg-red-900/10 rounded-2xl max-w-md mx-auto text-center">
                            <AlertTriangle className="w-10 h-10 text-red-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Error Loading Data</h3>
                            <p className="text-red-300/80 text-sm">{error}</p>
                        </div>
                    ) : interviews.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-3xl bg-white/[0.02] text-center">
                            <NotebookText className="w-12 h-12 text-slate-600 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">No Interviews Recorded</h3>
                            <p className="text-slate-500">Mock interview sessions will appear here.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {interviews.map((mock, index) => (
                                <SpotlightCard 
                                    key={mock._id}
                                    className="rounded-2xl p-6 md:p-8"
                                >
                                    {/* Card Header */}
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                                                <NotebookText className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-white mb-2">{mock.jobRole}</h2>
                                                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                                                    {mock.jobDescription}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="text-right shrink-0">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(mock.createdAt).toLocaleDateString('en-GB')}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Meta Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-[#111] border border-white/5 rounded-xl p-4">
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="p-2 rounded-lg bg-white/5 text-slate-400">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">User</p>
                                                <p className="text-slate-300 truncate" title={mock.userEmail}>{mock.userEmail}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="p-2 rounded-lg bg-white/5 text-slate-400">
                                                <Code className="w-4 h-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Tech Stack</p>
                                                <p className="text-slate-300 truncate" title={mock.techStack}>{mock.techStack}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="p-2 rounded-lg bg-white/5 text-slate-400">
                                                <Clock className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Experience</p>
                                                <p className="text-slate-300">{mock.experience} Years</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Accordion Toggle */}
                                    <div className="border-t border-white/5 pt-4">
                                        <button
                                            onClick={() => toggleQuestions(index)}
                                            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium text-indigo-400 group"
                                        >
                                            <span>
                                                {expandedIndex === index ? "Hide" : "View"} Questions & Answers
                                            </span>
                                            {expandedIndex === index ? (
                                                <ChevronUp className="w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                                            )}
                                        </button>

                                        <AnimatePresence>
                                            {expandedIndex === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="space-y-3 pt-4">
                                                        {Object.values(mock.geminiResponse).map((q, idx) => (
                                                            <div
                                                                key={q._id || idx}
                                                                className="bg-[#111] rounded-xl p-5 border border-white/5"
                                                            >
                                                                <div className="flex gap-3 mb-3">
                                                                    <span className="text-indigo-400 font-mono text-sm shrink-0 mt-0.5">Q{idx + 1}:</span>
                                                                    <p className="text-white font-medium text-sm leading-relaxed">
                                                                        {q.question}
                                                                    </p>
                                                                </div>
                                                                <div className="flex gap-3 pl-8 border-l border-white/10 ml-1">
                                                                    <span className="text-slate-500 font-mono text-sm shrink-0">A:</span>
                                                                    <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                                                                        {q.answer || "No answer recorded."}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllMockInterviews;