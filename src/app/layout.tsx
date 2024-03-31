import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Waste-ease",
    description: "Waste-ease for Simplified your Waste Management",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-white text-black max-w-[400px] min-h-screen m-auto`}>
                <Toaster position="top-left" />
                <Navbar />
                {children}
            </body>
        </html>
    );
}
