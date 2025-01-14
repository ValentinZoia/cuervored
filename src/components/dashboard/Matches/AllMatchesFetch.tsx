"use client"

import React, { memo, Suspense } from "react";
import { getAllMatches } from "@/data/matches";
import SkeletonAllMatchesTable from "./SkeletonAllMatchesTable";
import { AllMatchesData, BasicMatchData } from "@/types/Match";
import { useQueryMatches } from "@/hooks/useQueryMatches";
import dynamic from "next/dynamic";


const MatchTable = dynamic(() => import('./MatchTable'), {
  loading: () => <SkeletonAllMatchesTable/>,
  ssr: false // Deshabilitamos SSR para componentes que solo necesitan renderizar en cliente
});

const getAllLastMatches = (matches:AllMatchesData['AllMatches']['LastMatches']) => matches;

const getAllUpcomingMatches = (matches:AllMatchesData['AllMatches']['UpcomingMatches']) => matches;

export default function AllMatchesFetch() {
  //obtenemos todos los partidos de san lorenzo con react query ya que son datos asincronos
  const {data, error, isLoading} = useQueryMatches({queryKey:"AllMatches", fetchFn:getAllMatches, type: {} as AllMatchesData})
  
  if (isLoading) {
    return <SkeletonAllMatchesTable/>;
  }

  if (error) {
    console.error(error);
    return <p>Ocurrió un error al cargar los partidos</p>;
  }
  
  if(!data || (!data.AllMatches.LastMatches.length && !data.AllMatches.UpcomingMatches.length)) {
    return <p>No hay partidos para mostrar</p>
  } 
    
  const AllLastMatches = getAllLastMatches(data.AllMatches.LastMatches);
  const AllUpcomingMatches = getAllUpcomingMatches(data.AllMatches.UpcomingMatches);


  const MemoizedMatchTable = memo(({ matches, isPastMatches }: { matches: BasicMatchData[], isPastMatches: boolean }) => (
    <MatchTable matches={matches} isPastMatches={isPastMatches} />
  ));
  MemoizedMatchTable.displayName = 'MemoizedMatchTable';
  
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row justify-center items-start lg:space-x-8 space-y-8 lg:space-y-0">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-center">Partidos Pasados</h2>
          <div className="border rounded-lg overflow-hidden">
            <Suspense fallback={<SkeletonAllMatchesTable/>}>
              <MemoizedMatchTable matches={AllLastMatches} isPastMatches={true} />
            </Suspense>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-center">Próximos Partidos</h2>
          <div className="border rounded-lg overflow-hidden">
          <Suspense fallback={<SkeletonAllMatchesTable/>}>
              <MemoizedMatchTable matches={AllUpcomingMatches} isPastMatches={false} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
