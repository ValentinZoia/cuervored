import { AllMatchesData, MatchesData } from "@/types/Match";
import { useQuery } from "@tanstack/react-query";

interface UseQueryMatchesProps<T> {
    queryKey: string;
    fetchFn: () => Promise<T>;
    type:T;
}



export function useQueryMatches<T extends AllMatchesData | MatchesData>({ 
    queryKey, 
    fetchFn,
    type 
}: UseQueryMatchesProps<T>) {
  return useQuery<T>({
    queryKey: [queryKey],
    queryFn: fetchFn,
    staleTime: 1000 * 60 * 60 * 24, // 24 horas
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 días
    refetchOnWindowFocus: false,
    retry: 2,
  });
}