"use client"
import { toast } from "@/components/ui/use-toast";
import { FollowerInfo } from "@/types/Post";
import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


interface useFollowerUserMutationProps {
   userId: string;
    initialState: FollowerInfo;
  }

export function useFollowerUserMutation({
    userId,
    initialState,
  }: useFollowerUserMutationProps) {
    
  
    const queryClient = useQueryClient();
  
    const queryKey: QueryKey = ["follower-info", userId];
  
    const { data, isLoading } = useQuery({
      queryKey,
      queryFn: async () => {
        const response = await axios.get<FollowerInfo>(`/api/user/${userId}/followers`);
        return response.data;
      },
      initialData: initialState,
      staleTime: Infinity,
    });
  
    const { mutate, isPending } = useMutation({
      mutationFn: async () =>
        data.isFollowedByUser
          ? await axios.delete<FollowerInfo>(`/api/user/${userId}/followers`)
          : await axios.post<FollowerInfo>(`/api/user/${userId}/followers`),
      onMutate: async () => {
        await queryClient.cancelQueries({
          queryKey,
        });
  
        const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);
  
        queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
          followers:
            (previousState?.followers || 0) +
            (previousState?.isFollowedByUser
              ? previousState.followers == 0
                ? 0
                : -1
              : 1),
          isFollowedByUser: !previousState?.isFollowedByUser,
        }));
  
        return { previousState };
      },
      
      onError(error, variables, context) {
         queryClient.setQueryData(queryKey, context?.previousState);
        console.error(error);
        toast({
          description: "Algo salió mal, por favor intenta de nuevo",
          title: "Error al seguir usuario",
          variant: "destructive",
        });
      },
      
    });
  
    return {
      data,
      isLoading,
      isPending,
      mutate,
    };
  }