import { QueryKey, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { getAllUsersByIdToMatchAttendance } from "@/data/user";
import axios from "axios";

interface UseMatchAttendanceMutationProps {
  userId?:string;
  matchId:string;
}


export function useMatchAttendanceMutation({userId, matchId}: UseMatchAttendanceMutationProps) {
    const {toast} = useToast();
    const queryClient = useQueryClient();
    const queryKey:QueryKey = ["match-attendance", matchId];


    const {
      data,
      isLoading,
      error,
      hasNextPage,
      status,
      fetchNextPage,
      isFetchingNextPage,
    } = useInfiniteQuery({
      queryKey: queryKey,
      queryFn: ({ pageParam }) =>
        getAllUsersByIdToMatchAttendance({
          pageParam,
          matchId: matchId,
        }),
      enabled: !!matchId.trim(),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      gcTime: 1000 * 60 * 5, // 5 minutos
    });


    const {mutate, isPending} = useMutation({
      mutationFn: async () => {
        // Obtenemos el estado actual de asistencia desde la primera página
        const isAttending = data?.pages[0]?.isUserSession ?? false;
        
        if (isAttending) {
          return await axios.delete(`/api/matchAttendance/${matchId}`);
        } else {
          return await axios.post(`/api/matchAttendance/${matchId}`);
        }
      },
      onMutate: async () => {
        await queryClient.cancelQueries({
          queryKey,
        });
      },
        
        
    });
    
    return{
      data,
      isLoading,
      error,
      hasNextPage,
      status,
      fetchNextPage,
      isFetchingNextPage,
      mutate,
      isPending,
    }
    
}
  