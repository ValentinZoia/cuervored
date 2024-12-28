"use client"
import { getAllMatches } from '@/data/matches';
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import AllMatchesTable from './AllMatchesTable';
import SkeletonAllMatchesTable from './SkeletonAllMatchesTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UpcomingMatches from '../UpcomingMatches/UpcomingMatches';

export default function AllMatches() {
  
  const {data, error, isLoading} = useQuery({
    queryKey: ["AllMatches"],
    queryFn: getAllMatches,
    staleTime: 1000 * 60 * 60 * 24,
  })
  
  if (isLoading) {
    return <SkeletonAllMatchesTable/>;
  }

  if (error) {
    console.error(error);
    return <p>Ocurrió un error al cargar los partidos</p>;
  }

  
  

    return (
    <>
    <div className="w-full min-w-0 space-y-5 ">
            <Tabs defaultValue="table-matches">
          <TabsList className="px-0 flex  space-x-4 bg-card border-[1px] border-border rounded-lg ">
            <TabsTrigger className="w-1/2 " value="table-matches">Partidos en el año</TabsTrigger>
            <TabsTrigger className="w-1/2 " value="upcoming-matches">Ultimos y Proximos Partidos</TabsTrigger>
          </TabsList>
          <TabsContent value="table-matches">
          <AllMatchesTable matches={data || []}/>
          </TabsContent>
          <TabsContent value="upcoming-matches">
            <UpcomingMatches/>
          </TabsContent>
        </Tabs>
          </div>
    
    </>
  )
}
