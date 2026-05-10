"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TermsAndConditions() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="max-w-4xl mx-auto pt-24 p-6 text-gray-200">
            <h1 className="text-4xl font-bold mb-6 text-white">Terms & Conditions</h1>

            <p className="mb-4">
                Welcome to <strong>Rezumix</strong>. By using this site, you agree to be legally bound by the terms and conditions set forth below.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">1. Use of Services</h2>
            <p className="mb-4">
                Rezumix provides tools for resume analysis, personality prediction, career recommendations and mock interview system. You agree to use these services only for lawful purposes and not to misuse or disrupt the platform.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">2. Account Responsibility</h2>
            <p className="mb-4">
                You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your responsibility.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">3. Intellectual Property</h2>
            <p className="mb-4">
                All content on Rezumix, including AI models, visuals, and branding, is our intellectual property. You may not copy, reproduce, or distribute any part of the platform without permission.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">4. Data Usage</h2>
            <p className="mb-4">
                We collect and use your data in accordance with our <a href="/privacy-policy" className="text-blue-400 underline">Privacy Policy</a>. By using Rezumix, you consent to such usage.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">5. Limitation of Liability</h2>
            <p className="mb-4">
                Rezumix provides services &quot;as is&quot; and does not guarantee specific career outcomes. We are not liable for any damages resulting from the use or inability to use our services.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">6. Termination</h2>
            <p className="mb-4">
                We reserve the right to terminate your access if you violate these terms, misuse the platform, or act in a harmful or unlawful manner.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">7. Modifications</h2>
            <p className="mb-4">
                We may update these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">8. Contact</h2>
            <p className="mb-4">
                For any legal questions or concerns, email us at: <Link href={`${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`} className="text-blue-400 underline">{`${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}</Link>
            </p>
        </div>
    );
}
