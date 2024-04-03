"use client";
import SpinLoading from "@/components/loading/SpinLoading";
import React, { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
const Page = () => {
    const [user, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
        <div>
            <h1 className=" text-3xl font-bold uppercase mt-7">Coupons</h1>
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <SpinLoading />
                </div>
            ) : (
                <div>
                    {user.userData && user.userData.coupons && user.userData.coupons.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3 mt-12">
                            {user.userData.coupons.map((coupon: any, index: number) => (
                                <div key={index}>
                                    <div className="flex bg-white/80 border-2 h-40  border-black/40 shadow-lg w-full rounded-lg">
                                        <div className="flex flex-col p-4 w-full h-full">
                                            <Image src={logo} height={40} width={50} alt="logo" />
                                            <div className="w-full h-[2px] bg-black/40"></div>
                                            <div className="text-xl font-bold  capitalize opacity-80 ">{coupon.service}</div>
                                            <div className=" p-2 text-lg text-center  bg-black/10 rounded-lg"> {coupon.code || "Invalid"}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center text-3xl font-bold min-h-screen">No coupons available</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Page;
