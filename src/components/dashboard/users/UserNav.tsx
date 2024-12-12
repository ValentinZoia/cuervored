"use client"

import React from 'react'
import ArrowBack from '../ArrowBack'

interface UserNavProps {
    username: string | null
    full_name: string | null
}


export default function UserNav({username, full_name}:UserNavProps) {
 
  
    return (
    <div className='border-x-[1px] border-t-[1px] w-full flex justify-start items-center gap-4 h-[53px] px-2 bg-card'>
        <div>
            <ArrowBack />
            
        </div>
        <div>
            <h1 className='text-2xl font-bold'>
                {full_name ? full_name : username ? username : "Unknown"}
            </h1>

        </div>
    </div>
  )
}
