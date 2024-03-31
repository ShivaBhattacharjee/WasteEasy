"use client";
import React, { useEffect,useRef, useState } from "react";
import { Scan } from "lucide-react";

import Toast from "@/utils/toast";

const Page: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [photoData, setPhotoData] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    // Function to start camera with back camera
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            if (videoRef.current) {
                setLoading(false);
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            Toast.ErrorShowToast("Error accessing camera");
            console.error("Error accessing camera:", err);
        }
    };

    // Function to capture photo
    const capturePhoto = () => {
        if (videoRef.current) {
            const video = videoRef.current;
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL("image/jpeg");
                setPhotoData(dataURL);
                alert(photoData);
            }
        }
    };

    // Start camera when component mounts
    useEffect(() => {
        startCamera();
    }, []); // Empty dependency array ensures the effect runs only once

    // Render the component
    return (
        <div className="flex flex-col  mt-4 w-full">
            <h1 className=" flex items-start justify-start mb-7 text-3xl font-bold text-start">Scan Waste</h1>
            <div>
                {loading ? <div className="w-full rounded-lg relative animate-pulse bg-black/80" style={{ height: "400px" }} /> : <video ref={videoRef} autoPlay muted className="w-full rounded-lg relative" height={400} width={100} />}
                {/* Video element to display camera feed */}

                <button onClick={capturePhoto} className=" bg-green-600 w-full flex gap-3 items-center text-center justify-center  text-3xl font-bold  rounded-lg text-white mt-7  p-4">
                    <Scan /> Scan
                </button>
            </div>
            {photoData && <>{photoData}</>}
        </div>
    );
};

export default Page;
