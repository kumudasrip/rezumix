"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
    User, 
    Brain, 
    Heart, 
    Building, 
    Clock, 
    Sparkles, 
    AlertCircle,
    Loader2,
    Briefcase
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

// 1. Grid Background (Amber/Orange Theme to match Career Recommendations)
const GridBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
    <div className="absolute top-0 left-0 w-full h-[60vh] bg-amber-600/5 blur-[120px] rounded-full mix-blend-screen" />
    <div className="absolute bottom-0 right-0 w-full h-[60vh] bg-orange-600/5 blur-[120px] rounded-full mix-blend-screen" />
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
              rgba(245, 158, 11, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full z-10">{children}</div>
    </div>
  );
}

const AllRecommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.allRecommendations();
                setRecommendations(response.recommendations || []);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch recommendations');
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
                <Loader2 className="w-8 h-8 animate-spin text-amber-500 mr-2" />
                <span>Loading recommendations...</span>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-amber-500/30 overflow-x-hidden">
            <GridBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-6">
                        <Briefcase className="w-3 h-3" />
                        <span>Admin View</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Recommendations</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        A complete history of generated career paths and user profiles.
                    </p>
                </div>

                {/* Content Area */}
                <div className={`transition-all duration-700 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {error ? (
                        <div className="flex flex-col items-center justify-center p-8 border border-red-500/20 bg-red-900/10 rounded-2xl max-w-md mx-auto text-center">
                            <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Something went wrong</h3>
                            <p className="text-red-300/80 text-sm">{error}</p>
                        </div>
                    ) : recommendations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-3xl bg-white/[0.02] text-center">
                            <Sparkles className="w-12 h-12 text-slate-600 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">No Recommendations Yet</h3>
                            <p className="text-slate-500">Generated career paths will appear here.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendations.map((rec, index) => (
                                <SpotlightCard 
                                    key={rec._id || index} 
                                    className="rounded-2xl p-6 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300"
                                >
                                    {/* Card Header */}
                                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5">
                                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <div className="min-w-0">
                                            <h2 className="text-lg font-bold text-white truncate capitalize">
                                                {rec.recommendUserName || "Anonymous User"}
                                            </h2>
                                            <p className="text-xs text-slate-500">
                                                ID: {rec._id?.slice(-6).toUpperCase() || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="space-y-4 flex-grow">
                                        
                                        <div>
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                <Brain className="w-3 h-3" /> Skills
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {rec.skills.slice(0, 3).map((skill, i) => (
                                                    <span key={i} className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-xs text-slate-300">
                                                        {skill.trim()}
                                                    </span>
                                                ))}
                                                {rec.skills.length > 3 && (
                                                    <span className="px-2 py-1 text-xs text-slate-500">+{rec.skills.length - 3}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                <Heart className="w-3 h-3" /> Interests
                                            </div>
                                            <p className="text-sm text-slate-400 line-clamp-1">
                                                {rec.interests.join(', ')}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            <div>
                                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                                    <Building className="w-3 h-3" /> Preference
                                                </div>
                                                <p className="text-sm text-white capitalize font-medium">
                                                    {rec.preferredWorkEnvironment}
                                                </p>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                                    <Clock className="w-3 h-3" /> Availability
                                                </div>
                                                <p className="text-sm text-white font-medium">
                                                    {rec.timeCommitment} hrs/week
                                                </p>
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

export default AllRecommendations;