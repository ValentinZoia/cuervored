import React from 'react'
import UserNav from '../users/UserNav'
import { Card } from '../ui/card'
import MatchAttendanceContent from './MatchAttendanceContent'
import { notFound } from 'next/navigation'

export default function MatchAttendanceCard({matchId}:{matchId:string}) {
  

    return (
    <Card className="relative z-10 max-w-[680px] md:w-[680px] lg:w-[680px] bg-transparent border-none shadow-none  lg:col-span-2 mx-auto w-[100%] mb-4">
            <UserNav text_1={"Usuarios"} />
            <MatchAttendanceContent matchId={matchId}/>
    </Card>
  )
  
}