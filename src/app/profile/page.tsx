"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import SpinLoading from "@/components/loading/SpinLoading";
import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";

const Page = () => {
    const [user, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
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

    const logout = async () => {
        try {
            await axios.get("/api/auth/logout");
            Toast.SuccessshowToast("Logout Successfull");
            router.refresh();
            router.push("/");
        } catch (error: unknown) {
            const Error = error as Error;
            Toast.ErrorShowToast(Error?.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <>
            {loading ? (
                <div className="min-h-screen flex justify-center items-center">
                    <SpinLoading />
                </div>
            ) : (
                <div className="flex justify-center min-h-screen flex-col gap-2 items-center">
                    <img src={user.userData?.profilePicture || "https://i.pinimg.com/564x/58/79/29/5879293da8bd698f308f19b15d3aba9a.jpg"} className=" w-32 h-32 rounded-xl" alt="" />
                    <h1 className=" text-3xl font-bold tracking-wide capitalize">{user?.userData?.username}</h1>
                    <div className="opacity-70 text-lg tracking-normal">
                        {user?.userData?.state},{user?.userData?.city}
                    </div>
                    <button onClick={logout} className=" w-full p-4 rounded-lg  text-white bg-green-500">
                        Logout
                    </button>
                </div>
            )}
        </>
    );
};

export default Page;
