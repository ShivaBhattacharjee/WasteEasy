"use client";

import React, { useEffect, useState } from "react";
import { Bell, History } from "lucide-react";
import Link from "next/link";

import SpinLoading from "@/components/loading/SpinLoading";
interface ApiResponse {
    message: string;
    userData: UserData;
}
interface UserData {
    city: string;
    email: string;
    isVerified: boolean;
    isWorker: boolean;
    phoneNumber: string;
    profilePicture: string;
    state: string;
    totalPointsEarned: number;
    userDescription: string;
    username: string;
    wasteDumped: any[]; // You might want to define a type for wasteDumped if it has a specific structure
}

const Page = () => {
    const [user, setUserData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const getUserData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"}/api/auth/profile`);
            const data = await response.json();
            console.log(data);
            setUserData(data);
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            console.log(error);
            return [];
        }
    };
    useEffect(() => {
        getUserData();
    }, []);
    return (
        <section className="flex flex-col gap-3 p-4">
            {loading ? (
                <div className="min-h-screen flex justify-center items-center">
                    <SpinLoading />
                </div>
            ) : (
                <>
                    {user ? (
                        <div className="flex items-center justify-between ">
                            <Link href={"/profile"} className="flex items-center gap-3">
                                <img src={user.userData?.profilePicture || "https://i.pinimg.com/564x/58/79/29/5879293da8bd698f308f19b15d3aba9a.jpg"} className=" w-12 h-12 rounded-xl" alt="" />
                                <div className="flex flex-col gap-0">
                                    <h1 className=" font-semibold text-xl">Hi,{user?.userData?.username || "Unknown"}</h1>
                                    <span className=" text-sm font-medium opacity-70 ">
                                        {user?.userData?.state || "Unknown"} , {user?.userData?.city || "Unknown"}
                                    </span>
                                </div>
                            </Link>

                            <div className="flex gap-3">
                                <History size={30} className=" opacity-60" />
                                <Bell size={30} className=" opacity-60 " />
                            </div>
                        </div>
                    ) : (
                        <h1 className=" text-3xl font-bold text-red-500 min-h-screen">Error loading user profile</h1>
                    )}
                </>
            )}
        </section>
    );
};

export default Page;
