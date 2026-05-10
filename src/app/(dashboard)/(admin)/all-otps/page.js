"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
    AlertTriangle, 
    ShieldCheck, 
    Trash2, 
    Loader2, 
    Search,
    Calendar,
    KeyRound,
    Lock,
    X,
    ShieldAlert
} from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';

// 1. Grid Background (Rose/Red Theme for Security)
const GridBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
    <div className="absolute top-0 left-0 w-full h-[60vh] bg-rose-600/5 blur-[120px] rounded-full mix-blend-screen" />
    <div className="absolute bottom-0 right-0 w-full h-[60vh] bg-red-600/5 blur-[120px] rounded-full mix-blend-screen" />
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
              rgba(225, 29, 72, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full z-10">{children}</div>
    </div>
  );
}

const AllOTP = () => {
    const [otps, setOtps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchOtps = async () => {
            try {
                const res = await apiClient.allOTPS();
                setOtps(res.otp || []);
            } catch (err) {
                setError('Failed to fetch OTPs');
                console.error(err);
            } finally {
                setLoading(false);
                setTimeout(() => setIsVisible(true), 100);
            }
        };

        fetchOtps();
    }, []);

    const handleDelete = async (email) => {
        try {
            await apiClient.deleteOTP(email);
            setOtps(prev => prev.filter(o => o.email !== email));
            toast.success('OTP deleted successfully');
        } catch (err) {
            toast.error('Failed to delete OTP');
            console.error(err);
        } finally {
            setShowConfirm(false);
            setSelectedEmail(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-rose-500 mr-2" />
                <span>Loading security logs...</span>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-rose-500/30 overflow-x-hidden">
            <GridBackground />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium mb-6">
                        <ShieldAlert className="w-3 h-3" />
                        <span>Security Protocol</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        OTP <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">Security Logs</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Manage active One-Time Passwords and security verification requests.
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
                    ) : otps.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-3xl bg-white/[0.02] text-center">
                            <ShieldCheck className="w-12 h-12 text-slate-600 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">All Secure</h3>
                            <p className="text-slate-500">No active OTP records found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otps.map((otp, index) => (
                                <SpotlightCard 
                                    key={otp._id || index}
                                    className="rounded-2xl p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                                            <Lock className="w-6 h-6" />
                                        </div>
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400 font-mono">
                                            ACTIVE
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-6 flex-grow">
                                        <div>
                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">User Email</p>
                                            <p className="text-white font-medium truncate" title={otp.email}>{otp.email}</p>
                                        </div>
                                        
                                        <div>
                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Verification Code</p>
                                            <div className="flex items-center gap-2">
                                                <KeyRound className="w-4 h-4 text-rose-400" />
                                                <span className="text-xl font-bold text-white tracking-widest">{otp.otp}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Created At</p>
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(otp.createdAt).toLocaleString('en-GB', {
                                                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setSelectedEmail(otp.email);
                                            setShowConfirm(true);
                                        }}
                                        className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/50 transition-all font-medium flex items-center justify-center gap-2 group"
                                    >
                                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        Revoke OTP
                                    </button>
                                </SpotlightCard>
                            ))}
                        </div>
                    )}
                </div>

                {/* Confirmation Modal */}
                <AnimatePresence>
                    {showConfirm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
                            >
                                {/* Modal Glow */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                                            <AlertTriangle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-white">Revoke OTP?</h2>
                                            <p className="text-slate-400 text-sm">This action cannot be undone.</p>
                                        </div>
                                    </div>

                                    <p className="text-slate-300 mb-8 leading-relaxed">
                                        Are you sure you want to delete the verification record for <span className="text-white font-semibold">{selectedEmail}</span>? The user will need to request a new code.
                                    </p>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowConfirm(false)}
                                            className="flex-1 py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleDelete(selectedEmail)}
                                            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-colors shadow-lg shadow-red-900/20"
                                        >
                                            Delete Record
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AllOTP;