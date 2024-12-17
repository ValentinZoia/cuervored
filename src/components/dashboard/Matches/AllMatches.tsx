"use client"
import { getAllMatches } from '@/data/matches';
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import AllMatchesTable from './AllMatchesTable';

export default function AllMatches() {
  
  const {data, error, isLoading} = useQuery({
    queryKey: ["AllMatches"],
    queryFn: getAllMatches,
    staleTime: 1000 * 60 * 60 * 24,
  })
  
  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    console.error(error);
    return <p>Ocurrió un error al cargar los partidos</p>;
  }

  
  

    return (
    <>
    <AllMatchesTable matches={data || []}/>
    </>
  )
}
