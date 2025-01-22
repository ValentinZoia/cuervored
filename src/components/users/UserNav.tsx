"use client"

import React from 'react'
import ArrowBack from '@/components/ArrowBack'

//usuario al cual corresponde el perfil que se esta viendo, NO EL LOGEADO
interface UserNavProps {
    text_1: string | null
    text_2?: string | null
}


export default function UserNav({text_1, text_2}:UserNavProps) {
 
  
    return (
    <div className='border-x-[1px] border-t-[1px] w-full flex justify-start items-center gap-4 h-[53px] px-2 bg-card'>
        <div>
            <ArrowBack />
            
        </div>
        <div>
            <h1 className='text-2xl font-bold'>
                {text_1 ? text_1 : text_2 ? text_2 : "Unknown"}
            </h1>

        </div>
    </div>
  )
}
