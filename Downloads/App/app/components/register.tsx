"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import logo from '@/app/assets/favicon.ico';
import {
Dropdown,
DropdownMenu,
DropdownTrigger,
DropdownItem,
} from "@nextui-org/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import axios from "axios";
import { useInfoMsg } from "../torusStaticHandlers/infoMsgHandler";

const RegisterForm = () => {
const [checkDetails, setCheckDetails] = useState(false);
const [userData, setUserData] = useState<any>({});
const [client, setClient] = useState<string>("");
const [steps, setSteps] = useState("0");
const [realmList, setRealmList] = useState<string[]>([]);
const toast=useInfoMsg()
const baseUrl : any = process.env.NEXT_PUBLIC_API_BASE_URL;

interface tp_sendVerificationOTPDto {
  email: string,
  client: string
}

interface tp_verifyMailIdDto {
  otp: string,
  email: string,
  client: string,
}

interface tp_registerDto {
  userData: any,
  client: string,
}

const fetchClients = async () => {
  try {
    const tp_getClientTenant = await axios.get(`${baseUrl}/tp/getClientTenant`);
    if(tp_getClientTenant?.data?.error === true){
      toast(tp_getClientTenant?.data?.errorDetails?.message, 'danger')
      return
    }
    if (tp_getClientTenant.status === 200) {
      setRealmList(tp_getClientTenant.data);
    } else {
      throw new Error("Failed to fetch clients");
    }
  } catch (error) {
    toast("Failed to fetch clients", 'danger')

  }
};

useEffect(() => {
  fetchClients();
}, []);


const router = useRouter();
const [isVisible, setIsVisible] = React.useState(false);
const [isVisibility, setIsVisibility] = React.useState(false);

const toggleVisibility = () => setIsVisible(!isVisible);
const toggleVisible = () => setIsVisibility(!isVisibility);

const schema = z
  .object({
    username: z
      .string()
      .min(2, { message: "username should be at least 2 characters" })
      .max(20, { message: "max limit" }),
    firstname: z
      .string()
      .min(3, { message: "firstname should be at least 3 characters" })
      .max(30),
    lastname: z.string().min(1, { message: "Please provide lastname" }),
    email: z.string().email(),
    mobile: z.string().min(10, { message: "Please provide valid mobile number" }).max(10, { message: "Please provide valid mobile number" }),
    password: z.string().min(4, { message: "Please provide valid password" }),
    confirmPassword: z
      .string()
      .min(4, { message: "Please provide valid password" }),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({ resolver: zodResolver(schema) });


const submitData = async (data:any) => {
  setUserData(data);

  try {
    const tp_sendVerificationOTPBody :tp_sendVerificationOTPDto={
      email: data.email, 
      client: client
    }
    const tp_sendVerificationOTP = await axios.post(`http://localhost:3002/tp/auth/sendVerificationOTP`, tp_sendVerificationOTPBody);
    if (tp_sendVerificationOTP.status === 201) {
      setSteps("1");
    } else {
      toast("Unable to send OTP", 'danger')
    }
  } catch (err) {
    toast("Unable to send OTP", 'danger')
  }
};


const [otp, setOtp] = useState<any>({ otp: "" });

const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setOtp({ [name]: value });
};

const verifyOtpandPostUser = async () => {
  try {
    if (otp.otp == "") {
      toast("Please enter OTP", 'danger')
      return;
    }

    const tp_verifyMailIdBody :tp_verifyMailIdDto={
      otp: otp.otp,
      email: userData.email,
      client: client,
    }
    const tp_verifyMailId = await axios.post(`http://localhost:3002/tp/auth/verifyMailId`, tp_verifyMailIdBody);
    if (tp_verifyMailId.status == 201) {
      toast("Email verified successfully", 'success')
      const tp_registerBody :tp_registerDto={
        userData: {...userData},
        client: client,
      }
      const tp_register = await axios.post("http://localhost:3002/tp/register",tp_registerBody);
      if (tp_register.status == 201) {
        toast("Registered successfully", 'success')
        router.push("/")
      } else {
        toast("failed to register try again after some time", 'danger')
        setSteps("0");
      }
    } else {
      toast("Invalid OTP", 'danger')
    }
  } catch (error) {
    const { response }: any = error;
    const message = response.data.errorDetails;
    const statusCode = response.status;
    toast(`Request failed with the status code of ${statusCode} and message of ${message}`, 'danger')
    if (statusCode == 403) {
      setSteps("0");
    }
  }
}



const inputClasses = {
  base: " w-full my-2 h-7 ",
  label: ["text-xs  text-white focus-within:text-white"],

  inputWrapper: [
    "border border-slate-500/50",
    "text-white",
    "bg-transparent",
    "data-[hover=true]:bg-[#282551]",
    "data-[hover=true]:border-[#4435CF]",
    "focus-within:!bg-[#282551]",
    "focus-within:border-[#4435CF] border-2",
  ],
  innerWrapper: [
    "bg-transparent",
    "boder-2 border-blue-100",
  ],
}

return (
  <div className="flex flex-col md:flex-row gap-2 w-full md:max-w-screen   items-center  ">
    <div
      className="flex flex-col gap-2 w-full   items-center justify-center min-h-screen  bg-slate-400"
      style={{
        background:
          "radial-gradient(circle, rgba(67,57,208,1) 0%, rgba(9,9,121,1) 19%, rgba(18,18,19,1) 100%)",
      }}
    >
      <div className="flex gap-2 ">
        <Image
          className=" w-12 h-12   transition-all"
          src={logo}
          alt=""
        ></Image>

        <h2 className="text-center font-bold text-4xl text-white">Torus</h2>
      </div>

      {(() => {
        switch (steps) {
          case "0":
            return (
              <div className="p-4 rounded-xl shadow-md w-[42%] flex flex-col gap-4 border-2 border-[#323B45] text-white bg-slate-800/70">
                <div>
                  <h2 className="text-2xl text-bold font-semibold ">
                    Create Account
                  </h2>
                  <p className="text-slate-400 text-[14px]">
                    Sign into your account by entering your information below
                  </p>
                </div>

                <Dropdown className="border border-[#20252B] p-0">
                  <DropdownTrigger>
                    <Button
                      size="lg"
                      variant="bordered"
                      className={`border-2 border-[#323B45] ${checkDetails && !client
                        ? "text-red-400"
                        : "text-white"
                        }`}
                    >
                      {client ? client : "Select Client"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Link Actions"
                    className=" text-white rounded-sm"
                    variant="light"
                    classNames={{
                      base: "bg-[#33304F]",
                    }}
                  >
                    {realmList.map((realm, id) => (
                      <DropdownItem
                        className=" text-white hover:bg-slate-300"
                        key={id}
                        onClick={() => setClient(realm)}
                      >
                        {realm}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>

                <form
                  onSubmit={handleSubmit(submitData)}
                  className="flex flex-col gap-1"
                >
                  <Input
                    label=" Enter your username"
                    labelPlacement="outside"
                    variant="bordered"
                    color={`${errors.username ? "danger" : "primary"}`}
                    classNames={inputClasses}
                    type="text"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p
                      className="text-red-500 text-xs"
                      style={{ color: "red" }}
                    >
                      {errors?.username?.message as string}
                    </p>
                  )}
                  <div className="flex justify-between text-xs gap-2">
                    <div className="flex flex-col gap-2 w-full">
                      <Input
                        label="firstname"
                        labelPlacement="outside"
                        variant="bordered"
                        color={`${errors.firstname ? "danger" : "primary"}`}
                        classNames={inputClasses}
                        type="text"
                        {...register("firstname")}
                      />
                      {errors.firstname && (
                        <p
                          className="text-red-500 flex flex-col"
                          style={{ color: "red" }}
                        >
                          {errors.firstname.message as string}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <Input
                        label="Lastname"
                        labelPlacement="outside"
                        variant="bordered"
                        color={`${errors.lastname ? "danger" : "primary"}`}
                        classNames={inputClasses}
                        type="text"
                        {...register("lastname")}
                      />
                      {errors.lastname && (
                        <p className="text-red-500 flex flex-col">
                          {errors.lastname.message as string}
                        </p>
                      )}
                    </div>
                  </div>
                  <Input
                    label="Email"
                    labelPlacement="outside"
                    variant="bordered"
                    color={`${errors.email ? "danger" : "primary"}`}
                    classNames={inputClasses}
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">
                      {errors.email.message as string}
                    </p>
                  )}
                  <Input
                    label="Mobile Number"
                    labelPlacement="outside"
                    variant="bordered"
                    color={`${errors.mobile ? "danger" : "primary"}`}
                    classNames={inputClasses}
                    type="text"
                    {...register("mobile")}
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-xs">
                      {errors.mobile.message as string}
                    </p>
                  )}
                  <div className="flex justify-between text-xs gap-2">
                    <div className="flex flex-col gap-2 w-full">
                      <Input
                        type={isVisible ? "text" : "password"}
                        label="Password"
                        labelPlacement="outside"
                        variant="bordered"
                        color={`${errors.password ? "danger" : "primary"}`}
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <MdOutlineRemoveRedEye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        classNames={inputClasses}
                        {...register("password")}
                      />
                      {errors.password && (
                        <p className="text-red-500">
                          {errors.password.message as string}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <Input
                        type={isVisibility ? "text" : "password"}
                        label="confirmPassword"
                        labelPlacement="outside"
                        variant="bordered"
                        color={`${errors.confirmPassword ? "danger" : "primary"
                          }`}
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisible}
                          >
                            {isVisibility ? (
                              <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <MdOutlineRemoveRedEye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        classNames={inputClasses}
                        {...register("confirmPassword")}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500">
                          {errors.confirmPassword.message as string}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center w-full gap-3">
                      <p className="text-slate-400 text-[14px]">
                        Already have an account?{" "}
                      </p>
                      <span
                        className="cursor-pointer hover:bg-slate-400 rounded-full p-2 text-[14px] text-green-300"
                        onClick={() => router.push("/")}
                      >
                        login
                      </span>
                    </div>
                    <Button
                      color="primary"
                      className="mt-2 text-end"
                      type="submit"
                      onClick={() => setCheckDetails(true)}
                    >
                      submit
                    </Button>
                  </div>
                </form>
              </div>
            );
          case "1":
            return (
              <div className="p-4 rounded-xl shadow-md w-[42%] flex flex-col gap-4 border-2 border-[#323B45]  text-white bg-slate-800/70">
                <p className="text-center text-[16px]">Enter OTP</p>
                <Input
                  name="otp"
                  label="OTP"
                  labelPlacement="outside"
                  type="text"
                  onChange={handleOtpChange}
                  color={`${errors.password ? "danger" : "primary"}`}
                  classNames={inputClasses}
                />
                <Button
                  color="primary"
                  className="mt-2 text-end"
                  onClick={verifyOtpandPostUser}
                >
                  Submit
                </Button>
              </div>
            );
        }
      })()}
    </div>
  </div>
);
};

export default RegisterForm;
