import MatchAttendanceCard from '@/components/MatchAttendance/MatchAttendanceCard'
import { localStorageData } from '@/components/UpcomingMatches/mutation';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'


type MetaDataProps ={
  params:Promise<{matchId:string}>
}

//Definimos la metadata dinamica de la página
export async function generateMetadata({ params }: MetaDataProps): Promise<Metadata> {
  const matchId = (await params).matchId;

  if (!matchId) {
      notFound();
  }
  try {
    const getMatches = localStorage.getItem('football-matches-filtered-cache');
    const MatchesParsed: localStorageData = JSON.parse(getMatches || '{}');

    const isInUpcomingMatches = MatchesParsed.data.matchesFiltered.UpcomingMatches.find(
      (match) => match.id === matchId
    );

    const isInPastMatches = MatchesParsed.data.matchesFiltered.LastMatches.find(
      (match) => match.id === matchId
    );
  
    const match = isInUpcomingMatches || isInPastMatches;

    if (!match) {
      notFound();
    }

    const {opponent, date} = match;

  return {
    title: `San Lorenzo vs ${opponent} - ${date}`,
    description: `Lista de asistentes del partido de San Lorenzo vs ${opponent} el ${date}`,
    openGraph:{
      title: `San Lorenzo vs ${opponent} - ${date}`,
      description: `Lista de asistentes del partido de San Lorenzo vs ${opponent} el ${date}`,
      type:"website",
      url:`${process.env.NEXT_PUBLIC_URL}/matchAttendance/${matchId}`,
      siteName:"CuervoRed",
      
    }
  };
  } catch (error) {
    return{
      title:`${matchId}`,
      description:`Lista de asistentes del partido ${matchId}`,
      openGraph:{
        title:`${matchId}`,
        description:`Lista de asistentes del partido ${matchId}`,
        type:"website",
        url:`${process.env.NEXT_PUBLIC_URL}/matchAttendance/${matchId}`,
        siteName:"CuervoRed",
      }
    }
  }
    
}




export default function MatchAttendancepage({params}:{params:{matchId:string}}) {
  if(!params.matchId){
      return notFound();
    }

  return (
    <MatchAttendanceCard matchId={params.matchId}/>
  )
}
