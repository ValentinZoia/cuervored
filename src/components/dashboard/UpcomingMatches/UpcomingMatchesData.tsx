"use client"
import { useQuery } from "@tanstack/react-query";
import { getUpcomingMatches } from "@/data/matches";
import { MatchesData } from "@/types/Match";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic imports con configuración de loading fallback
const MatchesCard = dynamic(() => import('./MatchesCard'), {
  loading: () => <SkeletonMatchesCard title="Cargando..." />,
  ssr: false // Deshabilitamos SSR para componentes que solo necesitan renderizar en cliente
});


// Mantenemos SkeletonMatchesCard como import estático ya que es necesario para el loading
import SkeletonMatchesCard from "./SkeletonMatchesCard";



// Separamos la lógica de filtrado a funciones puras
const getLastMatches = (matches: MatchesData['matchesFiltered']['LastMatches']) => 
  matches.slice(Math.max(0, matches.length - 3));


const getUpcomingMatchesSlice = (matches: MatchesData['matchesFiltered']['UpcomingMatches']) => 
  matches.slice(0, 3);




export default function UpcomingMatchesData() {
  const { data, isLoading, error } = useQuery<MatchesData>({
    queryKey: ["matches"],
    queryFn: getUpcomingMatches,
    staleTime: 1000 * 60 * 60 * 24, // 24 horas
    // Agregamos configuraciones adicionales para optimizar el cache
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 días - remplaza a cacheTime
    refetchOnWindowFocus: false, // Evitamos refetch innecesarios
    retry: 2 // Limitamos los reintentos en caso de error
  });

  if (isLoading) {
    return (
      <div role="status" aria-label="Cargando partidos">
        <SkeletonMatchesCard title="Últimos partidos" />
        <SkeletonMatchesCard title="Próximos partidos" />
      </div>
    );
  }

  if (error) {
    console.error('Error loading matches:', error);
    return (
      <div role="alert" className="error-message">
        Ocurrió un error al cargar los partidos
      </div>
    );
  }

  if (!data || (!data.matchesFiltered.LastMatches.length && !data.matchesFiltered.UpcomingMatches.length)) {
    return <div role="status">No hay partidos para mostrar</div>;
  }

  const lastMatches = getLastMatches(data.matchesFiltered.LastMatches);
  const upcomingMatches = getUpcomingMatchesSlice(data.matchesFiltered.UpcomingMatches);

  return (
    <div>
      <Suspense fallback={<SkeletonMatchesCard title="Cargando últimos partidos" />}>
        <MatchesCard
          title="Últimos partidos"
          matches={lastMatches}
          isPastMatches={true}
        />
      </Suspense>
      
      <Suspense fallback={<SkeletonMatchesCard title="Cargando próximos partidos" />}>
        <MatchesCard
          title="Próximos partidos"
          matches={upcomingMatches}
          isPastMatches={false}
        />
      </Suspense>
    </div>
  );
}