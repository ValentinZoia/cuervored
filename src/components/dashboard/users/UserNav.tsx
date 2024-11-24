"use client"
import { Button } from '@/components/ui/button'
import {  ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface UserNavProps {
    username: string | null
    full_name: string | null
}


export default function UserNav({username, full_name}:UserNavProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  
    return (
    <div className='border-x-[1px] border-t-[1px] w-full flex justify-start items-center gap-4 h-[53px] px-2 bg-card'>
        <div>
            <Button variant='ghost' className='rounded-full' onClick={handleBack}>
                <ArrowLeft className='size-5' />
            </Button>
            
        </div>
        <div>
            <h1 className='text-2xl font-bold'>
                {full_name ? full_name : username ? username : "Unknown"}
            </h1>

        </div>
    </div>
  )
}
