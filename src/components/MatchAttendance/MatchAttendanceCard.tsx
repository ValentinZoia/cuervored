"use client";
import React, { useEffect, useState } from 'react'
import UserNav from '../users/UserNav'
import { Card } from '../ui/card'
import MatchAttendanceContent from './MatchAttendanceContent'
import { notFound } from 'next/navigation'
import MatchAttendanceHeader from './MatchAttendanceHeader'
import { localStorageData } from '../UpcomingMatches/mutation'
import { set } from 'zod';
import { LoadMoreSpinner } from '../LoadMoreSpinner';
import { BasicMatchData } from '@/types/Match';

export default function MatchAttendanceCard({matchId}:{matchId:string}) {
  const [match, setMatch] = useState<BasicMatchData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getMatches = localStorage.getItem('football-matches-filtered-cache');
    if (!getMatches) {
      setIsLoading(false);
      notFound();
      return;
    }

    const MatchesParsed: localStorageData = JSON.parse(getMatches);
    
    const isInUpcomingMatches = MatchesParsed.data.matchesFiltered.UpcomingMatches.find(
      (match) => match.customId === matchId
    );

    const isInPastMatches = MatchesParsed.data.matchesFiltered.LastMatches.find(
      (match) => match.customId === matchId
    );
  
    const foundMatch = isInUpcomingMatches || isInPastMatches;

    if (!foundMatch) {
      setIsLoading(false);
      notFound();
      return;
    }

    setMatch(foundMatch);
    setIsLoading(false);
  }, [matchId, setMatch, setIsLoading]);

  // Render nothing if match is not found
  if (!match) {
    return null;
  }


  const {opponent, date, opponentImage} = match;

  return (
    <Card className="relative z-10 max-w-[680px] md:w-[680px] lg:w-[680px] bg-transparent border-none shadow-none  lg:col-span-2 mx-auto w-[100%] mb-4">
      <UserNav text_1={`Quienes van al partido`} />
      {isLoading ?(
        <>
        
          <LoadMoreSpinner />
        
        
        </>
      ):(
        <>
        <MatchAttendanceHeader 
        oponent={opponent as string} 
        oponentImage={opponentImage as string} 
        date={date as string} 
      />
      <MatchAttendanceContent matchId={matchId}/>
        </>
      )}
      
    </Card>
  )
}