
import { Card } from '@/components/ui/card'
import React from 'react'
import SearchNav from './SearchNav'
import SearchContent from './SearchContent'
import { getAllUsersByUsername } from '@/data/user';
import { auth } from '@/auth';

export default async function SearchCard() {

  
    return (
    <Card className="relative z-10 max-w-[680px] md:w-[680px] lg:w-[680px] bg-transparent border-none shadow-none  lg:col-span-2 mx-auto w-[100%] mb-4">
            <SearchNav />
            <SearchContent />
    </Card>
  )
}
