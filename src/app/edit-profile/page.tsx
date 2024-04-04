import React from "react";
import { Lato } from "next/font/google";
const lato = Lato({ weight: "400", subsets: ["latin"] });
const page = () => {
    return (
        <div className={`${lato.className}`}>
            <h1 className={`text-3xl font-bold capitalize mt-7`}>Edit Profile</h1>
        </div>
    );
};

export default page;
