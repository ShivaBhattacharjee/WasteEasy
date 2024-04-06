"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import { useRouter } from "next/navigation";

import SpinLoading from "@/components/loading/SpinLoading";
import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";
Chart.register(...registerables); // Register necessary controllers
import { Cloud, Edit, Landmark, LogOut, Recycle } from "lucide-react";
import { Lato } from "next/font/google";
import Link from "next/link";
const lato = Lato({ weight: "400", subsets: ["latin"] });
const Page = () => {
    const [user, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const [chartInstance, setChartInstance] = useState<any>(null); // State to hold the chart instance

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await fetch(`/api/auth/profile`);
                const data = await response.json();
                console.log(data);
                setUserData(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        getUserData();
    }, []);

    const logout = async () => {
        try {
            await axios.get("/api/auth/logout");
            Toast.SuccessshowToast("Logout Successful");
            router.refresh();
            router.push("/");
        } catch (error: unknown) {
            const Error = error as Error;
            Toast.ErrorShowToast(Error?.response?.data?.error || "Something went wrong");
        }
    };

    const calculateWastePercentage = () => {
        if (!user || !user.userData || !user.userData.wasteDumped) return { recycled: 0, nonRecycled: 0 };

        let recycledCount = 0;
        let totalWasteCount = user.userData.wasteDumped.length;

        user.userData.wasteDumped.forEach((waste: any) => {
            if (waste.isRecyleable) {
                recycledCount++;
            }
        });

        let nonRecycledCount = totalWasteCount - recycledCount;

        return {
            recycled: (recycledCount / totalWasteCount) * 100,
            nonRecycled: (nonRecycledCount / totalWasteCount) * 100,
        };
    };

    useEffect(() => {
        if (user && user.userData && user.userData.wasteDumped) {
            renderChart();
        }
    }, [user]);

    const renderChart = () => {
        const ctx = document.getElementById("wasteChart") as HTMLCanvasElement;
        if (!ctx) return;

        if (chartInstance) {
            chartInstance.destroy(); // Destroy the previous chart instance
        }

        const { recycled, nonRecycled } = calculateWastePercentage() || 0;

        const newChartInstance = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Recycled", "Non-Recycled"],
                datasets: [
                    {
                        data: [recycled, nonRecycled],
                        backgroundColor: ["#259e73", "#F2BF87"],
                        hoverBackgroundColor: ["#a7ebd4", "#2e4a21"],
                    },
                ],
            },
        });

        setChartInstance(newChartInstance); // Save the new chart instance
    };
    // Function to calculate total saved CO2 emissions
    const calculateTotalCO2Saved = () => {
        if (!user || !user.userData || !user.userData.wasteDumped) return 0;

        let totalCO2Saved = 0;

        user.userData.wasteDumped.forEach((waste: any) => {
            // Assuming wasteDumped objects have a property named wastePoints indicating CO2 saved
            totalCO2Saved += waste.wastePoints || 0;
        });

        return totalCO2Saved;
    };
    return (
        <>
            {loading ? (
                <div className="min-h-screen flex justify-center items-center">
                    <SpinLoading />
                </div>
            ) : (
                <div className={`${lato.className} flex flex-col  min-h-[90vh]`}>
                    <h1 className=" text-4xl font-bold tracking-wide mt-3">Profile</h1>
                    <div className=" bg-green-600 rounded-3xl w-full h-48 mt-12">
                        <div className="flex relative flex-col text-white justify-center items-center h-full">
                            <div className="flex flex-col gap-2 relative">
                                <img src={user.userData?.profilePicture || "https://i.pinimg.com/564x/58/79/29/5879293da8bd698f308f19b15d3aba9a.jpg"} className=" w-20 h-20 rounded-xl" alt="" />
                                <h1 className=" text-3xl font-bold tracking-wide capitalize">{user?.userData?.username}</h1>
                                <Link href={"/edit-profile"} className="bg-white p-2 rounded-lg bottom-10 right-0 absolute text-black">
                                    <Edit size={17} />
                                </Link>
                            </div>

                            <div className="absolute bg-white border-2 border-black/10 text-black shadow-lg shadow-black/10 rounded-lg h-36 top-40 w-[80%] m-auto ">
                                <div className="flex justify-between items-center h-full">
                                    <div className="flex flex-col justify-center p-2 items-center">
                                        <div className="border-2 rounded-full p-4">
                                            <Landmark size={32} />
                                        </div>
                                        <span className=" font-semibold uppercase text-lg">{user?.userData.totalPointsEarned || "0"}</span>
                                        <span className="  uppercase text-xs opacity-70 font-semibold tracking-wider">Points</span>
                                    </div>
                                    <div className=" h-16 w-[3px] bg-black/40"></div>
                                    <div className="flex flex-col justify-center p-2 items-center">
                                        <div className="border-2 rounded-full p-4">
                                            <Cloud size={32} />
                                        </div>
                                        <span className=" font-semibold uppercase text-lg">{calculateTotalCO2Saved() || "0"}G</span>
                                        <span className="  uppercase text-xs opacity-70 font-semibold tracking-wider">Saved CO2</span>
                                    </div>
                                    <div className=" h-16 w-[3px] bg-black/40"></div>
                                    <div className="flex flex-col justify-center items-center p-2">
                                        <div className="border-2 rounded-full p-4">
                                            <Recycle size={32} />
                                        </div>
                                        <span className=" font-semibold uppercase text-lg">{user?.userData?.wasteDumped?.length || "0"}</span>
                                        <span className="  uppercase text-xs opacity-70 font-semibold tracking-wider">Recycled</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg shadow-black/10 rounded-lg border-2 border-black/10 w-full mt-32">
                        <div className=" w-56 flex justify-center items-center m-auto h-full mb-4 ">
                            <canvas id="wasteChart"></canvas>
                        </div>
                    </div>

                    <button onClick={logout} className="flex items-center justify-center gap-4 text-lg font-semibold w-full p-4 rounded-lg mt-5  text-white bg-green-600">
                        <LogOut /> Logout
                    </button>
                </div>
            )}
        </>
    );
};

export default Page;
