"use client"
import { useQuery } from "@tanstack/react-query";
import { getUpcomingMatches } from "@/data/matches";
import { BasicMatchData, MatchesData } from "@/types/Match";
import MatchesCard from "./MatchesCard";
import SkeletonMatchesCard from "./SkeletonMatchesCard";
import { useMemo } from "react";



export default function UpcomingMatchesData() {
    const { data, isLoading, error } = useQuery<MatchesData>({
      queryKey: ["matches"],
      queryFn: getUpcomingMatches,
      staleTime: 1000 * 60 * 60 * 24,
    });


  
    if (isLoading) {
      return (
        <>
        <SkeletonMatchesCard
          title="Últimos partidos"
          
        />
        <SkeletonMatchesCard
          title="Próximos partidos"
          
          
        />
        </>
      );
    }
  
    if (error) {
      console.error(error);
      return <p>Ocurrió un error al cargar los partidos</p>;
    }

    const lastMatches =  data?.matchesFiltered.LastMatches.slice(
        Math.max(0, data.matchesFiltered.LastMatches.length - 3)
      ) || [];
    
  
    const upcomingMatches = data?.matchesFiltered.UpcomingMatches.slice(0, 3) || [];
    

    if(!data || (!lastMatches.length && !upcomingMatches.length)){
      return <p>No hay partidos para mostrar</p>
    }

    
  
    
  
    return (
      <div>
        
        <MatchesCard
          title="Últimos partidos"
          matches={lastMatches}
          isPastMatches={true}
        />
        <MatchesCard
          title="Próximos partidos"
          matches={upcomingMatches}
          isPastMatches={false}
        />
      </div>
    );
  }