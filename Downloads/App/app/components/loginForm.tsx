"use client";
import React, { ChangeEvent, useState } from "react";
import { TextInput, Spin } from '@gravity-ui/uikit';
import {
ClosePassword,
TorusLogo,
} from "../utils/svgApplications";
import { PiEye } from "react-icons/pi";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie } from "./cookieMgment";
import { useInfoMsg } from "../torusStaticHandlers/infoMsgHandler";
import { api_signinDto } from '../interfaces/interfaces'


function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ tenant: "", username: "", password: "" });
    const router = useRouter()
    const toast=useInfoMsg()
    const baseUrl : any = process.env.NEXT_PUBLIC_API_BASE_URL;

    const handleFormSubmit = async () => {
        try {
            if (formData.tenant && formData.username && formData.password) {
                setLoading(true)
                const api_signinBody :api_signinDto={
                    client: formData.tenant,
                    username: formData.username,
                    password: formData.password
                }
                const api_signin = await axios.post(`${baseUrl}/api/signin`, api_signinBody)
                if(api_signin?.data?.error === true){
                    toast(api_signin?.data?.errorDetails, 'danger')
                    return
                }
                if (api_signin.status == 201) {
                    setCookie('token', api_signin.data.token)
                    setCookie('tenant', formData.tenant)
                    document.cookie = `language=${'en'}`;
                    let defaultScreen = 'torus_poc_2_menu_item'
                    document.cookie = `currentPage=${JSON.stringify(defaultScreen)}`
                    router.push('./' + defaultScreen)
                } else {
                    setLoading(false)
                }
            } else {
                // setCheckDetails(true)
                setLoading(false)
            }
        } catch (error:any) {
            toast(error?.response?.data?.errorDetails, 'danger')
            if (error?.response) {
                setLoading(false)
            } else {
                setLoading(false)
            }
        }
    }

    const passwordvisible = () => {
        setShowPassword(!showPassword);
    };

    const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="h-screen w-full flex flex-col gap-[5.51vw] justify-betweenn py-[0.62vh] bg-[#FFFFFF] border-none dark:bg-[#000000]">
            <h2 className="flex leading-[2.6vh] text-[1.25vw] px-[0.87vw] py-[1.87vh] items-center font-medium text-black dark:text-white transition-transform duration-700 ease-in-out">
                <TorusLogo /> TORUS
            </h2>
            <div className="flex w-full px-[4.09vw]">
                <div className="flex flex-col h-[82.16vh] w-[21.23vw] gap-[3.36vh]">
                    <div className="flex flex-col">
                        <h1 className="text-[2vw] leading-[4.4vh] font-semibold text-black dark:text-white">
                            Log in
                        </h1>
                        <p className="text-[#000000]/35 dark:text-white/35 pt-[1.24vh] text-[0.8vw] leading-[1.7vh]">
                            Enter your details to get started
                        </p>
                    </div>
                    <div className="flex flex-col transition-all duration-700 ease-in-out gap-[2.18vh]">
                        <div className={`flex flex-col transition-[visibility]animate-fadeOut duration-300`}>
                            <label
                                className="mb-[1.24vh] text-[0.8vw] font-medium leading-[1.7vh]"
                            >
                                Tenant
                            </label>
                            <TextInput
                                id="tenant"
                                name="tenant"
                                view="clear"
                                type="text"
                                onChange={handleFormDataChange}
                                placeholder="Enter your tenant name"
                                className="bg-[#F4F5FA] text-[0.8vw] font-medium leading-[1.7vh] outline-none pl-[0.87vw] dark:bg-[#171717] dark:text-[#FFFFFF] text-[#000000] py-[0.89vh] rounded-md w-full"
                            />
                        </div>
                        <div className="flex flex-col focus:outline-none">
                            <label
                                className="mb-[1.24vh] text-[0.8vw] font-medium leading-[1.7vh]"
                            >
                                Email or Username
                            </label>
                            <TextInput
                                id="username"
                                name="username"
                                view="clear"
                                type="text"
                                onChange={handleFormDataChange}
                                placeholder="eg:support@torus.com"
                                className="bg-[#F4F5FA] text-[0.8vw] font-medium leading-[1.7vh] outline-none pl-[0.87vw] dark:bg-[#171717] dark:text-[#FFFFFF] text-[#000000] py-[0.89vh] rounded-md w-full "
                            />
                        </div>
                        <div className="flex flex-col relative">
                            <label
                                className="text-black dark:text-white mb-[1.24vh] text-[0.8vw] font-medium leading-[1.7vh]"
                            >
                                Password
                            </label>
                            <TextInput
                                id="password"
                                name="password"
                                onChange={handleFormDataChange}
                                view="clear"
                                type={showPassword ? "text" : "password"}
                                onKeyUp={(e) => e.key === "Enter" && handleFormSubmit()}
                                placeholder="Enter Password"
                                className="bg-[#F4F5FA] pl-[0.87vw] outline-none text-[0.8vw] font-medium leading-[1.7vh] dark:text-[#FFFFFF] text-[#000000] dark:bg-[#171717] py-[0.89vh] rounded-md w-full"
                            />
                            <span
                                className="absolute bottom-[5.5vh] right-[1.25vw] cursor-pointer"
                                onClick={passwordvisible}
                            >
                                {showPassword ? (
                                    <PiEye size={16} />
                                ) : (
                                    <ClosePassword />
                                )}
                            </span>
                            <button
                                onClick={() => router.push('/resetPassword')}
                                className="text-black/35 dark:text-white outline-none self-start text-[0.8vw] font-medium leading-[1.7vh] mt-[1.87vh]">
                                Forgot Password?
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={handleFormSubmit}
                                disabled={loading}
                                className={`bg-[#0736C4] w-full flex justify-center text-white ${loading ? "py-[0.93vh]" : "py-[2.18vh]"
                                    } text-[0.8vw] font-semibold leading-[1.7vh] disabled:bg-[#8c9ac4] disabled:cursor-not-allowed focus:outline-none rounded-lg`}
                            >
                                {loading ? <Spin size="s" /> : "Sign In"}
                            </button>
                        </div>
                    </div>
                    <div className="flex h-[20vh] items-end justify-center text-[0.8vw] leading-[1.7vh]">
                        <p className="text-black/35 dark:text-white">
                            Don&apos;t have an account?{" "}
                            <a onClick={() => router.push('/register')} className="text-black cursor-pointer dark:text-white font-bold">
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;