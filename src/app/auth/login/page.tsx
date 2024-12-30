
import  BannerSl from "../../../../public/banner_sl.webp"
import React from "react";
import LoginForm from "./form";
import CuervoLogo from "@/components/icons/CuervoLogo";

export default function LoginPage() {
  return (
    <main className="w-full h-screen">
  <div className="w-full h-screen flex justify-center flex-col sm:flex-row">
    
    {/* Imagen */}
    
      <img
        src={BannerSl.src}
        alt="Cancha de san lorenzo con logo de la app"
        className=" hidden md:block   h-screen object-cover   "
      />
    

    {/* Formulario */}
    <div className="w-full  flex flex-col justify-center items-center px-4 ">
    
      <div className="mb-8">
        <CuervoLogo />
      </div>
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <LoginForm />
      </div>
    </div>
  </div>
</main>
  )
}


