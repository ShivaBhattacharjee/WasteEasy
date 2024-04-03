"use client";
import React, { useEffect, useState } from "react";
import { Lato } from "next/font/google";
import Image from "next/image";

import banner from "@/assets/banner.jpeg";
import logo from "@/assets/logo.png";
import SpinLoading from "@/components/loading/SpinLoading";
const lato = Lato({ weight: "400", subsets: ["latin"] });
const Page = () => {
    const [user, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getUserData = async () => {
        try {
            const response = await fetch(`/api/auth/profile`);
            const data = await response.json();
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
            <h1 className={`text-3xl ${lato.className} font-bold uppercase mt-7`}>Coupons</h1>
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <SpinLoading />
                </div>
            ) : (
                <div>
                    {user.userData && user.userData.coupons && user.userData.coupons.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3 mt-12">
                            {user.userData.coupons
                                .slice()
                                .reverse()
                                .map((coupon: any, index: number) => (
                                    <div key={index}>
                                        <div className="flex bg-white/80 border-2  border-black/40 shadow-lg w-full rounded-lg">
                                            <div className=" relative">
                                                <Image src={banner} height={200} width={300} alt="banner" className="  brightness-75" />
                                                <div className="bg-white mt-2 rounded-full w-12 border-2 border-black/90 absolute top-14 z-10 h-12 ml-2 p-2">
                                                    <Image src={logo} className="" height={180} width={180} alt="logo" />
                                                </div>

                                                <div className="flex flex-col p-4 w-full h-full">
                                                    <div className="text-xl font-bold  capitalize opacity-80 ">{coupon.service}</div>
                                                    <div className=" opacity-80 text-sm mb-3">{coupon.discount || "discount"}</div>
                                                    <div className=" p-2 text-lg text-center  bg-black/10 rounded-lg"> {coupon.code || "Invalid"}</div>
                                                </div>
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
