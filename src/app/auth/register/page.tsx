import Image from "next/image";
import React from "react";
import SignUpForm from "./form";
import CuervoLogo from "@/components/icons/CuervoLogo";
import { Metadata } from "next";

export const metadata:Metadata={
  title:"Crear cuenta",
  description:"Crea tu cuenta en CuervoRed y disfruta de una simple red social para hinchas de San lorenzo."
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
          <div className="max-h-screen flex-1 flex flex-col justify-center items-center gap-2 px-4 ">
            <div>
              <CuervoLogo />
            </div>
            <div className="w-full max-w-md px-2 overflow-y-auto ">
              <h1 className="text-3xl font-bold">Crea tu Cuenta</h1>
              <SignUpForm />
            </div>
          </div>
        </main>
    
  );
}