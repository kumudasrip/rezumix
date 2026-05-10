"use client";

import AdminSidebar from "./admin-sidebar/page";


// Global Background for Dashboard
const GridBackground = () => (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
    </div>
);

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#050505] text-slate-200">

            <GridBackground />

            {/* Sidebar Component */}
            <AdminSidebar />

            {/* Main Content Area 
                - md:pl-20: Desktop par left padding 80px (Collapsed Sidebar width).
                - pt-16: Mobile par top padding header ke liye.
                - md:pt-0: Desktop par top padding hata di.
            */}
            <main className="relative z-10 transition-all duration-300 ease-in-out md:pl-20 pt-16 md:pt-0">
                <div className="p-4 md:p-8 min-h-screen max-w-[1600px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}