"use client";

import React, { useState } from "react";
import { ClockLoader } from "react-spinners";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { stateandcity } from "@/assets/StateList";
import useDebounce from "@/hooks/debounce";
import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";

const Page = () => {
    const router = useRouter();
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedState, setSelectedState] = useState<string>("");
    const [citySelected, setCitySelected] = useState<string>("");
    const [cities, setCities] = useState<string[]>([]);

    const handlePasswordChange = useDebounce((value) => {
        setPassword(value);
        if (confirmPassword && confirmPassword !== value) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
    }, 800);

    const handleConfirmPasswordChange = useDebounce((value) => {
        setConfirmPassword(value);
        if (password && password !== value) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
    }, 800);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const UserData = {
                username: userName,
                email: email,
                password: password,
                state: selectedState,
                city: citySelected,
            };
            const res = await axios.post("/api/auth/register", UserData);
            if (res) {
                Toast.SuccessshowToast(`Email sent to ${email} please verify` || "Something went wrong");
            } else {
                Toast.ErrorShowToast("Something went wrong");
            }
            router.push("/login");
        } catch (error: unknown) {
            const Error = error as Error;
            console.log(Error);
            Toast.ErrorShowToast(Error?.response?.data?.error || "Something went wrong");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const state = event.target.value;
        setSelectedState(state);
        setCities(stateandcity[state as keyof typeof stateandcity]);
    };

    return (
        <>
            <Link href={"/login"} className=" font-bold text-lg p-4 flex items-center gap-2">
                <ArrowLeft />
                <h1>Back</h1>
            </Link>
            <section className="flex min-h-[80vh] justify-center items-center ">
                <div className=" border-2 border-black/10 shadow-md shadow-black/10 w-full m-4 md:m-auto p-4 rounded-lg">
                    <h1 className="font-semibold text-2xl text-left mb-5">Create Your Account</h1>
                    <form autoComplete="false" className="flex flex-col gap-2" onSubmit={handleRegister}>
                        <label htmlFor="text">Username</label>
                        <input type="text" placeholder="Username" className=" bg-transparent border-2 border-back/20 p-2 focus:outline-none focus:border-green-800 duration-200  rounded-lg text-black" onChange={(e) => setUserName(e.target.value)} />
                        <label htmlFor="Email">Email</label>
                        <input type="email" placeholder="Email" className=" bg-transparent border-2 border-black/20 p-2 focus:outline-none focus:border-green-800 duration-200  rounded-lg text-black" onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="text">Enter Your State</label>
                        <select onChange={handleStateChange} className="bg-transparent border-2 border-black/20 p-2 focus:outline-none focus:border-green-800 duration-200  rounded-lg text-black">
                            {Object.keys(stateandcity).map((state) => (
                                <option value={state} key={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="text">Enter Your City</label>
                        <select onChange={(e) => setCitySelected(e.target.value)} className=" bg-transparent border-2 border-black/20 p-2 focus:outline-none focus:border-green-800 duration-200  rounded-lg text-black">
                            {cities.map((city, index) => {
                                return (
                                    <option value={city} key={index}>
                                        {city}
                                    </option>
                                );
                            })}
                        </select>
                        <label htmlFor="Password">Password</label>
                        <div className={`flex justify-between items-center border-2 text-black rounded-lg  ${passwordMismatch ? "border-red-500" : "border-black/20"} p-2 `}>
                            <input type={`${showPassword ? "text" : "password"}`} placeholder="Enter a password" className="w-[90%] bg-transparent focus:outline-none " onChange={(e) => handlePasswordChange(e.target.value)} />
                            {showPassword ? <EyeOff onClick={() => setShowPassword(!showPassword)} /> : <Eye onClick={() => setShowPassword(!showPassword)} />}
                        </div>
                        <label htmlFor="password">Confirm Password</label>
                        <div className={`flex justify-between items-center border-2 rounded-lg text-black  ${passwordMismatch ? "border-red-500" : "border-black/20"} p-2 `}>
                            <input type={`${showConfirmPassword ? "text" : "password"}`} placeholder="Enter a password" className=" w-[90%] bg-transparent focus:outline-none" onChange={(e) => handleConfirmPasswordChange(e.target.value)} />
                            {showConfirmPassword ? <EyeOff onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> : <Eye onClick={() => setShowConfirmPassword(!showConfirmPassword)} />}
                        </div>
                        {passwordMismatch && <span className="text-red-500 font-semibold">Password Didn&apos;t Match</span>}
                        {password && confirmPassword.length < 8 && <span className="text-red-500 font-semibold">Password should have alteast 8 characters</span>}
                        {loading ? (
                            <button className=" font-semibold flex gap-3 p-3  bg-green-600 text-white rounded-lg items-center justify-center" disabled={true}>
                                <ClockLoader size={25} color="#fff" />
                                <span>Registering...</span>
                            </button>
                        ) : (
                            <button className={` p-3 ${userName && email && password && confirmPassword != "" && password === confirmPassword ? "bg-green-600 text-white cursor-pointer" : "bg-black/30 text-white cursor-not-allowed"} rounded-lg mt-3 font-semibold duration-200 ${userName && email && password && confirmPassword != "" && password && confirmPassword.length > 8 && password && "hover:bg-geen-500"} hover:text-white`}>Register</button>
                        )}

                        <span className=" text-center mt-2">
                            Already have an account?{" "}
                            <Link href={"/login"} className=" text-green-600 ">
                                Login
                            </Link>
                        </span>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Page;
