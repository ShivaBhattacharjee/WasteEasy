"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Bell, Cloud, History, Landmark, Recycle } from "lucide-react";
import Link from "next/link";

import SpinLoading from "@/components/loading/SpinLoading";
export interface ApiResponse {
    message: string;
    userData: UserData;
}
export interface UserData {
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
    const [openNotification, setOpenNotification] = useState<boolean>(false);
    const getUserData = async () => {
        try {
            const response = await fetch(`/api/auth/profile`);
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
        <section className="flex flex-col gap-3 pt-2">
            {loading ? (
                <div className="min-h-screen flex justify-center items-center">
                    <SpinLoading />
                </div>
            ) : (
                <>
                    {user ? (
                        <section className=" p-2 flex flex-col gap-8">
                            <div className="flex items-center justify-between ">
                                <Link href={"/profile"} className="flex items-center gap-3">
                                    <img src={user.userData?.profilePicture || "https://i.pinimg.com/564x/58/79/29/5879293da8bd698f308f19b15d3aba9a.jpg"} className=" w-12 h-12 rounded-xl" alt="" />
                                    <div className="flex flex-col gap-0">
                                        <h1 className=" font-semibold text-xl capitalize">Hi,{user?.userData?.username || "Unknown"}</h1>
                                        <span className=" text-sm font-medium opacity-70 ">
                                            {user?.userData?.state || "Unknown"} , {user?.userData?.city || "Unknown"}
                                        </span>
                                    </div>
                                </Link>

                                <div className="flex gap-3">
                                    <History size={30} className=" opacity-60" />
                                    <Bell size={30} className=" opacity-60 relative " onClick={() => setOpenNotification(!openNotification)} />
                                    <div className={` w-44 h-56 z-50 overscroll-y-scroll absolute bg-white ${openNotification ? " scale-100" : "scale-0"} duration-200 rounded-lg top-16 shadow-md shadow-black/40 right-5 border-2 border-black/10`}></div>
                                </div>
                            </div>

                            <div className=" bg-green-600 shadow-2xl p-6 shadow-black/30 rounded-lg w-full ">
                                <div className="flex items-center justify-between gap-4 p-4 text-white">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border-2 rounded-full p-1">
                                            <Landmark size={32} />
                                        </div>
                                        <span className=" font-semibold uppercase text-lg">{user?.userData.totalPointsEarned}</span>
                                        <span className="  uppercase text-xs opacity-70 font-semibold tracking-wider">Points</span>
                                    </div>

                                    <div className=" h-16 w-[3px] bg-white/40"></div>

                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border-2 rounded-full p-1">
                                            <Cloud size={32} />
                                        </div>
                                        <span className=" font-semibold uppercase text-lg">0G</span>
                                        <span className="  uppercase text-xs opacity-70 font-semibold tracking-wider">Saved CO2</span>
                                    </div>
                                    <div className=" h-16 w-[3px] bg-white/40"></div>
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border-2 rounded-full p-1">
                                            <Recycle size={32} />
                                        </div>
                                        <span className=" font-semibold uppercase text-lg">{user?.userData?.wasteDumped?.length}</span>
                                        <span className="  uppercase text-xs opacity-70 font-semibold tracking-wider">Recycled</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center">
                                    <h1 className=" font-semibold  opacity-90 text-green-900 text-2xl tracking-wide">Materials</h1>
                                    <Link href={"/bin-station"} className="flex items-center gap-3 opacity-60">
                                        More <ArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    ) : (
                        <h1 className=" text-3xl font-bold text-red-500 min-h-screen">Error loading user profile</h1>
                    )}
                </>
            )}
        </section>
    );
};

export default Page;
