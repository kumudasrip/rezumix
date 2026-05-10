"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
    User, 
    Briefcase, 
    ListChecks, 
    Link as LinkIcon, 
    AlertTriangle, 
    Loader2, 
    Calendar,
    BrainCircuit,
    FileText,
    Target,
    Zap
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

// 1. Grid Background (Cyan/Blue Theme to match SkillGap Tool)
const GridBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
    <div className="absolute top-0 left-0 w-full h-[60vh] bg-cyan-600/5 blur-[120px] rounded-full mix-blend-screen" />
    <div className="absolute bottom-0 right-0 w-full h-[60vh] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen" />
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
              rgba(6, 182, 212, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full z-10">{children}</div>
    </div>
  );
}

const AllSkillGaps = () => {
    const [skillGaps, setSkillGaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.allSkillGaps();
                setSkillGaps(response.skillGaps || []);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch skill gap data');
            } finally {
                setLoading(false);
                setTimeout(() => setIsVisible(true), 100);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-500 mr-2" />
                <span>Loading analysis data...</span>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
            <GridBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
                        <BrainCircuit className="w-3 h-3" />
                        <span>Admin Database</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Skill Gap <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Analysis Logs</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Track user skill assessments and target role requirements across the platform.
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
                    ) : skillGaps.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-3xl bg-white/[0.02] text-center">
                            <ListChecks className="w-12 h-12 text-slate-600 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">No Records Found</h3>
                            <p className="text-slate-500">Skill gap analyses will appear here.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skillGaps.map((skill, index) => (
                                <SpotlightCard 
                                    key={skill._id || index}
                                    className="rounded-2xl p-6 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300"
                                >
                                    {/* Card Header */}
                                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5">
                                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <div className="min-w-0">
                                            <h2 className="text-lg font-bold text-white truncate" title={skill.userEmail}>
                                                {skill.userEmail}
                                            </h2>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(skill.createdAt).toLocaleDateString('en-GB')}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="space-y-5 flex-grow">
                                        
                                        {/* Target Role */}
                                        <div>
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                <Target className="w-3 h-3 text-cyan-500" /> Target Role
                                            </div>
                                            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                                <p className="text-sm text-white font-medium capitalize">
                                                    {skill.jobRole}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Resume Link */}
                                        <div>
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                <FileText className="w-3 h-3" /> Resume Source
                                            </div>
                                            <a 
                                                href={skill.resumeUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors truncate"
                                            >
                                                <LinkIcon className="w-3 h-3 shrink-0" />
                                                <span className="truncate">View Document</span>
                                            </a>
                                        </div>

                                        {/* Required Skills */}
                                        <div>
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                <Zap className="w-3 h-3 text-yellow-500" /> Required Skills
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {skill.jobSkill.slice(0, 4).map((item, i) => (
                                                    <span 
                                                        key={i} 
                                                        className="px-2 py-1 rounded-md bg-cyan-950/30 border border-cyan-500/20 text-cyan-200 text-xs"
                                                    >
                                                        {item.trim()}
                                                    </span>
                                                ))}
                                                {skill.jobSkill.length > 4 && (
                                                    <span className="px-2 py-1 rounded-md bg-white/5 text-slate-400 text-xs">
                                                        +{skill.jobSkill.length - 4}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
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

export default AllSkillGaps;