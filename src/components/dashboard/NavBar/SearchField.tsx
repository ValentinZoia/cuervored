"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import {useRouter} from 'next/navigation'
import React from 'react'

export default function SearchField() {
  const router = useRouter();
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const q = (form.querySelector('input[name="q"]') as HTMLInputElement).value.trim();;
        if(!q) return;
        router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  
  
    return (
    <form onSubmit={handleSubmit} method='GET' action="/search">
        <div className="relative" >
            <Input name="q" placeholder="Search..." className=" pe-10 w-64 bg-card text-muted-foreground" style={{ WebkitBackgroundClip: "none" }}/>
            <Button type='submit' className="bg-transparent shadow-none absolute right-0 top-1/2 -translate-y-1/2 sm:size-6 md:size-4 hover:bg-transparent hover:shadow-none">
            <SearchIcon className='absolute right-3 top-1/2 -translate-y-1/2  size-4 transform text-muted-foreground cursor-pointer' />
            </Button>
            
        </div>
    </form>
  )
}
