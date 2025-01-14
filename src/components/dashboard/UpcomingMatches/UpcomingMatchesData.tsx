"use client"

import { getUpcomingAndLastMatches } from "@/data/matches";
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
import { useQueryMatches } from "@/hooks/useQueryMatches";



// Separamos la lógica de filtrado a funciones puras
const getLastMatches = (matches: MatchesData['matchesFiltered']['LastMatches']) => 
  matches.slice(Math.max(0, matches.length - 3));


const getUpcomingMatchesSlice = (matches: MatchesData['matchesFiltered']['UpcomingMatches']) => 
  matches.slice(0, 3);




export default function UpcomingMatchesData() {
 

  const {data, error, isLoading} = useQueryMatches({queryKey:"matches", fetchFn:getUpcomingAndLastMatches, type: {} as MatchesData})

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
          
        />
      </Suspense>
      
      <Suspense fallback={<SkeletonMatchesCard title="Cargando próximos partidos" />}>
        <MatchesCard
          title="Próximos partidos"
          matches={upcomingMatches}
          
        />
      </Suspense>
    </div>
  );
}