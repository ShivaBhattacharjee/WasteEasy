"use client";

import React, { useState } from "react";
import { ClockLoader } from "react-spinners";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";

const Page = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const loginData = {
                email: email,
                password: password,
            };
            const response = await axios.post(`/api/auth/login`, loginData);
            Toast.SuccessshowToast(response?.data?.message || "Login Successfull with some server side error");
            console.log(response);
            router.push("/");
            router.refresh();
        } catch (error: unknown) {
            const Error = error as Error;
            Toast.ErrorShowToast(Error?.response?.data?.error || "Something went wrong");
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="flex min-h-[88vh] justify-center items-center">
                <div className=" border-black/10 border-2  shadow-lg shadow-black/10   w-full  m-4 md:m-auto p-4 rounded-lg">
                    <h1 className="font-semibold text-2xl text-center mb-5">Welcome Back</h1>
                    <form autoComplete="false" className="flex flex-col gap-2" onSubmit={handleLogin}>
                        <label htmlFor="Email">Email</label>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className=" bg-transparent fill-none border-2  border-black/20 duration-200 focus:border-green-700 text-black p-2 focus:outline-none  rounded-lg  " autoComplete="off" />
                        <label htmlFor="Password">Password</label>
                        <div className="flex justify-between fill-none items-center border-2 rounded-lg border-black/20 p-2 ">
                            <input type={`${showPassword ? "text" : "password"}`} placeholder="Password" className=" w-[90%] bg-transparent focus:outline-none" onChange={(e) => setPassword(e.target.value)} />
                            {showPassword ? <EyeOff onClick={() => setShowPassword(!showPassword)} /> : <Eye onClick={() => setShowPassword(!showPassword)} />}
                        </div>
                        {password.length < 0 && <span className=" text-red-500">Password should have alteast 8 characters</span>}
                        <div className="flex justify-start mt-3">
                            <Link href={"/forgot-password"} className=" text-green-700">
                                Forgot Password?
                            </Link>
                        </div>
                        {loading ? (
                            <button className=" font-semibold flex gap-3 p-3  bg-green-600 text-white rounded-lg items-center justify-center" disabled={true}>
                                <ClockLoader size={26} color="#fff" />
                                <span>Onboarding...</span>
                            </button>
                        ) : (
                            <button className={` p-3 ${email && password != "" ? "bg-green-600 text-white cursor-pointer" : "bg-black/30 text-white  cursor-not-allowed"} rounded-lg mt-3 font-semibold duration-200"} `} disabled={email && password != "" ? false : true}>
                                Login
                            </button>
                        )}
                        <span className=" text-center mt-2">
                            Dont have an account?{" "}
                            <Link href={"/register"} className=" text-green-600 ">
                                Signup
                            </Link>
                        </span>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Page;
