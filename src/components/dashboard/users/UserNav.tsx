"use client"
import { Button } from '@/components/ui/button'
import {  ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface UserNavProps {
    username: string | null
}


export default function UserNav({username}:UserNavProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  
    return (
    <div className='w-full flex justify-start items-center gap-4 h-[53px] px-2'>
        <div>
            <Button variant='ghost' className='rounded-full' onClick={handleBack}>
                <ArrowLeft className='size-5' />
            </Button>
            
        </div>
        <div>
            <h1 className='text-2xl font-bold'>
                {username ? username : "User"}
            </h1>

        </div>
    </div>
  )
}
