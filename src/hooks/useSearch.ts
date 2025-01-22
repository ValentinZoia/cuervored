
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsersByUsername } from "@/data/user";
import { useState, useEffect } from "react";
import { UserData } from "@/types/Post";
import { useDebounce } from './useDebounce';

export function useSearch(initialQuery: string) {
  
  //initialQuery es el username buscado en el input (/search?q=initialQuery)
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<UserData[]>([]);
  const [showCard, setShowCard] = useState(false);
  const queryClient = useQueryClient();

  //Actualizar el query si cambia el initialQuery
  useEffect(() => {setQuery(initialQuery)}, [initialQuery]);

  
  //Aplicamos debounce al query
  const debouncedQuery = useDebounce(query, 300);

  //Obtener todos los usuarios que contengan el username buscado osea query
  const { data, isLoading, isPending, error, hasNextPage, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: ({ pageParam }) => getAllUsersByUsername({ 
      pageParam, 
      username: debouncedQuery 
    }),
    enabled: !!debouncedQuery.trim(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    gcTime: 1000 * 60 * 5, // 5 minutos
  });

// Actualizar el resultado cuando cambie la data
  useEffect(() => {
    if (data) {
      setResults(data.pages.flatMap((page) => page.users) || []);
    }
  }, [data]);

  // Limpiar el resultado si el query esta vacio
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      
    }
  }, [debouncedQuery]);

  return {
    query,
    debouncedQuery,
    setQuery,
    results,
    isLoading,
    isPending,
    error,
    status,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    showCard,
    setShowCard,
    queryClient,
  };
}