"use client";
import React, { useEffect, useRef, useState } from "react";
import { MoonLoader } from "react-spinners";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { Scan, Trash } from "lucide-react";
import Link from "next/link";

import Toast from "@/utils/toast";

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];

const Page: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [photoData, setPhotoData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [aiLoading, setaiLoading] = useState(false);
    const [aiData, setAiData] = useState<any | null>(null);
    const [demo, setDemo] = useState<any | null>(null);
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
            }
        }
    };

    const scanImage = async () => {
        try {
            setaiLoading(true);
            const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", safetySettings: safetySettings });
            const prompt = "Does this look like a recyclable or non recyclable waste to you? Send the % of probability, only with two decimals. Don't send 'yes' or 'no' text, only %. Send both the % of how much it's recyclable and how much it's  also tell the type of waste. like dry waste, wet waste etc. and detect the type of material used in the waste and give a relevant name to the waste  and total count of waste too . send response in a json type without ``` or extra anything `` pure keys and values in json ";
            const formatMatch = photoData.match(/^data:(image\/(\w+));base64,/);
            if (!formatMatch) {
                console.error("Unsupported image format");
                alert("Unsupported image format");
                return;
            }

            const image = {
                inlineData: {
                    data: photoData.replace(formatMatch[0], ""),
                    mimeType: "image/jpeg",
                },
            };

            const result = await model.generateContent([prompt, image]);
            const jsonString = result.response.text().replace(/```json([\s\S]*?)```/, "$1");
            const parsedJson = JSON.parse(jsonString);
            setDemo(result.response.text());
            console.log(parsedJson);
            setaiLoading(false);
            setAiData(parsedJson);
        } catch (err) {
            console.error("Error scanning image:", err);
            alert("Error scanning image" + err);
        } finally {
            setaiLoading(false);
        }
    };

    useEffect(() => {
        if (photoData) {
            scanImage();
        }
    }, [photoData]);

    useEffect(() => {
        startCamera();
    }, []);

    return (
        <div className="flex relative flex-col  mt-4 w-full mb-40">
            <h1 className=" flex items-start justify-start mb-7 text-3xl font-bold text-start">Scan Waste</h1>
            <div>
                {loading ? <div className="w-full rounded-lg relative animate-pulse bg-black/80" style={{ height: "400px", borderRadius: "50px" }} /> : <video ref={videoRef} autoPlay muted className=" w-full rounded-lg relative h-96" />}
                <button onClick={capturePhoto} className=" bg-green-600 w-16 h-16 m-auto rounded-full  flex gap-3 items-center text-center justify-center  text-3xl font-bold text-white mt-7  p-4">
                    <div className="flex flex-col gap-3">
                        <Scan size={40} />
                    </div>
                </button>
            </div>
            {aiLoading ? (
                <div className=" bg-black/80 w-full min-h-screen fixed left-0 right-0 top-0">
                    <div className="flex justify-center items-center min-h-screen">
                        <MoonLoader color="#fff" size={90} />
                    </div>
                </div>
            ) : (
                <>
                    {aiData && (
                        <div className=" bg-black/5 shadow-lg w-full mt-12 mb-28 rounded-2xl border-2 border-black/10">
                            <div className="flex flex-col gap-4  p-4">
                                <h1 className="text-2xl uppercase font-bold">Waste Type</h1>
                                <h1 className=" text-lg font-bold capitalize">Waste Name : {aiData.waste_name || "unknown"}</h1>
                                <h1 className=" text-lg font-bold capitalize">Waste Type : {aiData.waste_type || "unknown"}</h1>
                                <h1 className=" text-lg font-bold">Recyclable: {aiData.recyclable_probability || "unknown"}%</h1>
                                <h1 className=" text-lg font-bold">Non Recyclable: {aiData.non_recyclable_probability || "unknown"}%</h1>
                                <h1 className=" text-lg font-bold">Total Waste Count: {aiData.total_count || "0"}</h1>
                                {aiData.material && <h1 className=" text-lg font-bold capitalize">Material: {aiData.material.replace(/_/g, " ")}</h1>}

                                {demo}
                                <Link href={`/dump-waste?recycle=${parseFloat(aiData.recyclable_probability) > 70 ? true : false}&&wasteName=${aiData.waste_name}&&wasteType=${aiData.waste_type}&&material=${aiData.material}&&totalwaste=${aiData.waste_count}`} className=" flex justify-center items-center gap-3 bg-green-600 text-white p-5 rounded-lg">
                                    <Trash />
                                    Dump waste{" "}
                                </Link>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Page;
