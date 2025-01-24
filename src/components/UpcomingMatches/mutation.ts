"use client"
import { InfiniteData, QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";

import axios, { AxiosError } from "axios";
import {  UserData, UserMatchAttendanceInfo, UserPage } from "@/types/User";
import { MatchesData } from "@/types/Match";
import { useMemo } from "react";

interface UseMatchAttendanceMutationProps {
  initialState: UserMatchAttendanceInfo;
  matchId:string;
  loggedInUserId:string;
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

export function useMatchAttendanceMutation({ matchId, initialState, loggedInUserId }: UseMatchAttendanceMutationProps) {
  const matchDate = useMatchData(matchId);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["userSession-match-attendance", matchId];

  const {data, isLoading } = useQuery<UserMatchAttendanceInfo, Error>({
    queryKey,
    queryFn: async (): Promise<UserMatchAttendanceInfo> => {
      const response = await axios.get<UserMatchAttendanceInfo>(
        `/api/matchAttendance/${matchId}/sessionUser`
      );
      return response.data;
    },
    initialData:initialState,
    staleTime: Infinity,
  });





  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if(data.isUserAttendingMatch){
        const response = await axios.delete<UserData>(`/api/matchAttendance/${matchId}/sessionUser`);
        return response.data;
      }else{
        const response = await axios.post<UserData>(`/api/matchAttendance/${matchId}/sessionUser`,{matchDate});
        return response.data;
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const previousState = queryClient.getQueryData<UserMatchAttendanceInfo>(queryKey);

      queryClient.setQueryData<UserMatchAttendanceInfo>(queryKey, () => ({
        isUserAttendingMatch: !previousState?.isUserAttendingMatch,
      }));

        return { previousState };


      },
      onSuccess: async (data) => {

        await queryClient.cancelQueries({
          queryKey:["match-attendance", matchId],
        });
        const previousState = queryClient.getQueryData<UserMatchAttendanceInfo>(queryKey);

        /*Actualizar page de users match-attendance en cache de React Query
          si el usuario esta en la lista de asistentes y se desmarca, se debe eliminar el usuario de la lista
          si el usuario no esta en la lista de asistentes y se marca, se debe agregar el usuario a la lista       
        
          esto se definira con data.isUserAttendingMatch
        */
       queryClient.setQueryData<InfiniteData<UserPage, string | null>>(
        ["match-attendance", matchId],
        (oldData) => {
          if (!oldData) return;
          const firstPage = oldData.pages[0];
          if (firstPage) {
            const newUsers = previousState?.isUserAttendingMatch
              ? [data, ...firstPage.users]
              : firstPage.users.filter((user) => user.id !== loggedInUserId);
            return {
              pages: [{ ...firstPage, users: newUsers }],
              pageParams: oldData.pageParams,
            };
          }
        }
       )

       


      },
      onError: (error: AxiosError) => {
        const responseData:any = error.response?.data;
        const message:string = 
          responseData && typeof responseData === "object" && "error" in responseData
            ? responseData.error
            : error.message || "Error inesperado";
      
        toast({
          variant: "destructive",
          title: "Error al actualizar la asistencia",
          description: message,
        });
      
        console.error("Error capturado:", responseData);
      },
      
    });
    
    return{
      data,
      isLoading,
      mutate,
      isPending,
    }
    
}
  