"use client";
import React, { useEffect, useState } from "react";

import SpinLoading from "@/components/loading/SpinLoading";

const Page = () => {
    const [user, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <SpinLoading />
                </div>
            ) : (
                <>
                    {user && user.userData.wasteDumped.length > 0 ? (
                        <div>
                            {/* Render user's waste dumped data here */}
                            {user.userData.wasteDumped.map((dump: any, index: number) => (
                                <div key={index}>
                                    <p>Waste Name: {dump.wasteNameByAi}</p>
                                    <p>Waste Type: {dump.wasteType}</p>
                                    <p>Waste Points: {dump.wastePoints}</p>
                                    {/* Add more details as needed */}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h1>No Waste Dumped</h1>
                    )}
                </>
            )}
        </div>
    );
};

export default Page;
