
import  BannerSl from "../../../../public/banner_sl.webp"
import React from "react";
import LoginForm from "./form";
import CuervoLogo from "@/components/icons/CuervoLogo";
import { Metadata } from "next";
import Image from "next/image";

export const metadata:Metadata ={
  title:"Iniciar Sesión",
  description:"Inicia sesión en CuervoRed y disfruta de una simple red social para hinchas de San lorenzo.",
  
}



export default function LoginPage() {
  return (

<main className="min-h-screen flex">
      {/* Imagen */}
      <div className="hidden lg:block h-screen">
        <Image
          src="/banner_sl.webp"
          alt="Cancha de san lorenzo con logo de la app"
          width={960}
          height={1080}
          priority
          className="h-full w-auto object-cover"
        />
      </div>

      {/* Formulario */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 lg:px-8">
        <div className="mb-8">
          <CuervoLogo />
        </div>
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}


