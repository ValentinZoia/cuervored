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

    if(!data){
      return <p>No hay partidos para mostrar</p>
    }

    if( !data.matchesFiltered.LastMatches.length && !data.matchesFiltered.UpcomingMatches.length){ 
      return <p>No hay partidos para mostrar</p>
    }
  
    const lastMatches = data?.matchesFiltered.LastMatches.slice(
      Math.max(0, data.matchesFiltered.LastMatches.length - 3)
    );
    const upcomingMatches = data?.matchesFiltered.UpcomingMatches.slice(0, 3);

    const lastMatchesData:BasicMatchData[] = useMemo(() => lastMatches, [lastMatches]);

    const upcomingMatchesData:BasicMatchData[] = useMemo(() => upcomingMatches, [upcomingMatches]);
  
    return (
      <div>
        
        <MatchesCard
          title="Últimos partidos"
          matches={lastMatchesData || []}
          isPastMatches={true}
        />
        <MatchesCard
          title="Próximos partidos"
          matches={upcomingMatchesData || []}
          isPastMatches={false}
        />
      </div>
    );
  }