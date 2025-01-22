"use client"
import { InfiniteData, QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";

import axios, { AxiosError } from "axios";
import { UserData, UserPage } from "@/types/Post";
import { MatchesData } from "@/types/Match";
import { useMemo } from "react";

interface UseMatchAttendanceMutationProps {
  isAttending: boolean;
  matchId:string;
}

interface localStorageData{
  data: MatchesData;
  expiryTime:number;
}


function useMatchData(matchId: string): number {
  return useMemo(() => {
    const getMatches = localStorage.getItem('football-matches-filtered-cache');
    const MatchesParsed: localStorageData = JSON.parse(getMatches || '{}');
    const matchDateParse = MatchesParsed.data.matchesFiltered.UpcomingMatches.find(
      (match) => match.id === matchId
    );

    if (!matchDateParse?.date || !matchDateParse?.time) return Date.now();

    const [day, month] = matchDateParse.date.split('/');
    const [hours, minutes] = matchDateParse.time.split(':');
    const matchDate = new Date();
    matchDate.setDate(parseInt(day));
    matchDate.setMonth(parseInt(month) - 1);
    matchDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    return matchDate.getTime();
  }, [matchId]);
}

export function useMatchAttendanceMutation({ matchId, isAttending }: UseMatchAttendanceMutationProps) {
  const matchDate = useMatchData(matchId);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["match-attendance", matchId];

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (isAttending) {
        const { data: user } = await axios.delete<UserData>(`/api/matchAttendance/${matchId}`);
        return { user, isAttending };
      } else {
        const { data: user } = await axios.post<UserData>(`/api/matchAttendance/${matchId}`, { 
          matchDate 
        });
        return { user, isAttending };
        }
      },
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey });
        
      },
      onSuccess: (data) => {

        const oldData = queryClient.getQueryData<InfiniteData<UserPage>>(queryKey);
        const isAttending = oldData?.pages[0]?.isUserSession ?? false;
    
        // Optimistic update
        queryClient.setQueryData<InfiniteData<UserPage>>(queryKey, old => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              isUserSession: !isAttending,
              users: isAttending 
                ? page.users.filter(user => user.id !== data?.user.id)
                : data.user ? [...page.users, data?.user] : page.users
            }))
          };
        });
    
        return { oldData };


        


      },
      onError: (error: AxiosError) => {
        const responseData:any = error.response?.data;
        const message:string = 
          responseData && typeof responseData === "object" && "error" in responseData
            ? responseData.error
            : error.message || "Error inesperado";
      
        toast({
          variant: "default",
          title: "Error al actualizar la asistencia",
          description: message,
        });
      
        console.log("Error capturado:", responseData);
      },
      
    });
    
    return{
      
      mutate,
      isPending,
    }
    
}
  