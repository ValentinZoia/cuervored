import  LandScapeImage from "../../../../public/landscape.jpg"
import React from "react";
import SignUpForm from "./form";

export default function LoginPage() {
  return (
    <main className="w-full h-screen">
      <div className="w-full h-screen flex justify-center items-center">
        <div className=" w-0 sm:w-full">
          <img
            src={LandScapeImage.src}
            alt="paisaje con atardecer, pajaros y montañas"
            className="w-full h-screen object-cover"
          />
        </div>
        
        <div className="w-full flex flex-col justify-center items-center">
          <div className="mb-16">
            <h1 className="text-3xl font-bold font-kanit">LOGO</h1>
          </div>
          <div className="w-full  lg:w-[440px] px-8">
            <h1 className="text-3xl font-bold">Create your account</h1>
          </div>
          
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}