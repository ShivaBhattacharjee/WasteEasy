"use client";
import React from "react";
import { Home, MapPin, Scan, Ticket, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    if (pathname === "/login" || pathname === "/register" || pathname === "/forgot-password" || pathname === "/forget-password" || pathname === "/verify-register" || pathname === "/verify-forget-password") {
        return null;
    }
    return (
        <nav className=" fixed bottom-0 m-auto max-w-[400px]  bg-white w-full">
            <div className="flex items-center p-4 gap-3 justify-between bg-white shadow-2xl shadow-black w-full">
                <div className="flex gap-7 items-center">
                    <Link href={"/"} className="flex justify-center items-center flex-col">
                        <Home />
                        <span className=" text-xs font-medium opacity-70">Home</span>
                    </Link>
                    <Link href={"/location"} className="flex justify-center items-center flex-col">
                        <MapPin />
                        <span className=" text-xs font-medium opacity-70">Location</span>
                    </Link>
                </div>
                <Link href={"/scan-waste"} className="flex absolute -translate-x-1/2 right-36 bottom-8 bg-green-700 text-white  p-4 rounded-full flex-col gap-3">
                    <Scan />
                </Link>
                <div className="flex gap-7 items-center">
                    <Link href={"/cupons"} className="flex justify-center items-center flex-col">
                        <Ticket />
                        <span className=" text-xs font-medium opacity-70">Cupons</span>
                    </Link>
                    <Link href={"/profile"} className="flex justify-center items-center flex-col">
                        <User />
                        <span className=" text-xs font-medium opacity-70">Profile</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
