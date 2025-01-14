import React from 'react'
import AllMatchesFetch from './AllMatchesFetch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UpcomingMatches from '../UpcomingMatches/UpcomingMatches';

export default function AllMatches() {
  
  
  
  

    return (
    <>
    <div className="w-full min-w-0 space-y-5 ">
            <Tabs defaultValue="table-matches">
          <TabsList className="px-0 flex  space-x-4 bg-card border-[1px] border-border rounded-lg ">
            <TabsTrigger className="w-1/2 " value="table-matches">Partidos en el año</TabsTrigger>
            <TabsTrigger className="w-1/2 " value="upcoming-matches">Ultimos y Proximos Partidos</TabsTrigger>
          </TabsList>
          <TabsContent value="table-matches">
          <AllMatchesFetch />
          </TabsContent>
          <TabsContent value="upcoming-matches">
            <UpcomingMatches/>
          </TabsContent>
        </Tabs>
          </div>
    
    </>
  )
}
