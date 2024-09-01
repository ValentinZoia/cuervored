// "use client"
// import React, { useState } from 'react'
// import {useForm} from "react-hook-form";
// import {signIn} from "next-auth/react";
// import type {SignInResponse} from "next-auth/react"
// import { useRouter } from "next/navigation";


// export default function LoginPage() {
//   const { register, handleSubmit, formState: { errors },  } = useForm();
//   const [errorsDb, setErrorsDb] = useState({
//     error:""
//   });
// const router = useRouter();


//   const onSubmit = handleSubmit(async (data) =>{
//     const res = await signIn("credentials",{
//       email: data.email,
//       password: data.password,
//       redirect: false
//     }) as SignInResponse

//     console.log(res)
//     if (res?.error){
//       setErrorsDb({error: res.error})
//     } else {
//       router.push("/dashboard")
//     }
    
    
//   })

import React from "react";
import SignUpForm from "./form";

export default function LoginPage() {
  return (
    <main className="w-full h-screen">
      <div className="w-full h-screen flex justify-center items-center">
        <div className=" w-0 sm:w-full">
          <img
            src="https://img.freepik.com/foto-gratis/paisaje-suroeste-arte-digital_23-2151785612.jpg?t=st=1724447018~exp=1724450618~hmac=2e5acd25bbac0b026ea01e862582927c6402351a9db15f3671681991d6760570&w=1380"
            alt="paisaje con atardecer, pajaros y montañas"
            className="w-full h-screen object-cover"
          />
        </div>
        
        <div className="w-full flex flex-col justify-center items-center">
          <div className="mb-16">
            <h1 className="text-3xl font-bold font-kanit">LOGO</h1>
          </div>
          <div className="w-full  lg:w-[440px] px-8">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}







//   return (
//     <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
//       <form action="" onSubmit={onSubmit} className="w-1/4 flex flex-col gap-2">
//       {errorsDb.error && (<p className="bg-red-500 text-sm text-white p-3 rounded">{errorsDb.error as string}</p>)}
//       <h1 className='text-4xl text-black font-bold mb-4'>Login</h1>
      
      
      
      
//       <input type="email" {...register("email", {required:{value:true, message:"Email is required"}})} placeholder="Email" className="bg-slate-600 w-full p-2 rounded-md " />
//       {errors.email && (<p className="text-red-500">{errors.email.message as string}</p>)}

//       <input type="password" {...register("password",{required:{value:true, message:"Password is required"}})} placeholder="Password" className="bg-slate-600 w-full p-2 rounded-md"/>
//       {errors.password && (<p className="text-red-500">{errors.password.message as string}</p>)}
      
//       <button className="w-full bg-blue-500 rounded-md p-2 text-white"> Login</button>
//       </form>
//     </div>
//   )
// }

