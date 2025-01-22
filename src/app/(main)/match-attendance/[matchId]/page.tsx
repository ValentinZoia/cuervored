import MatchAttendanceCard from '@/components/MatchAttendance/MatchAttendanceCard'
import { notFound } from 'next/navigation';
import React from 'react'

export default function page({params}:{params:{matchId:string}}) {
  if(!params.matchId){
      return notFound();
    }

  return (
    <MatchAttendanceCard matchId={params.matchId}/>
  )
}
