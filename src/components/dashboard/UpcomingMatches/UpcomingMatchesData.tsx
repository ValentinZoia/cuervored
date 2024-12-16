"use client"
import { useQuery } from "@tanstack/react-query";
import { getUpcomingMatches } from "@/data/matches";
import { MatchesData } from "@/types/Match";
import MatchesCard from "./MatchesCard";



export default function UpcomingMatchesData() {
    const { data, isLoading, error } = useQuery<MatchesData>({
      queryKey: ["matches"],
      queryFn: getUpcomingMatches,
      staleTime: 1000 * 60 * 60 * 24,
    });
  
    if (isLoading) {
      return <p>Cargando...</p>;
    }
  
    if (error) {
      console.error(error);
      return <p>Ocurrió un error al cargar los partidos</p>;
    }
  
    const lastMatches = data?.matchesFiltered.LastMatches.slice(
      Math.max(0, data.matchesFiltered.LastMatches.length - 3)
    );
    const upcomingMatches = data?.matchesFiltered.UpcomingMatches.slice(0, 3);
  
    return (
      <div>
        <MatchesCard
          title="Últimos partidos"
          matches={lastMatches || []}
          isPastMatches={true}
        />
        <MatchesCard
          title="Próximos partidos"
          matches={upcomingMatches || []}
          isPastMatches={false}
        />
      </div>
    );
  }