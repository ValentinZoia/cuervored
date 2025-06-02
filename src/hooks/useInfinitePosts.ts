import {  useSuspenseInfiniteQuery } from "@tanstack/react-query";
import {  FetchPostsFunction, PostFeedType, QueryKeys } from "@/types/Post";




export interface UseInfinitePostsProps {
  queryKey: PostFeedType | string;
  fetchFn: FetchPostsFunction;
  isUserPagePosts?:boolean
}

export function useInfinitePosts({ queryKey, fetchFn, isUserPagePosts = false }: UseInfinitePostsProps) {
  
  //si isUserPagePosts es verdadero, la queryKey vendria a ser el userId.
  const userId = isUserPagePosts ? queryKey : undefined;
  return useSuspenseInfiniteQuery({
    queryKey: isUserPagePosts 
      ?[PostFeedType.POST_FEED,QueryKeys.USER_POSTS,userId]
      :[PostFeedType.POST_FEED,queryKey],
    queryFn: ({ pageParam  }) => 
      isUserPagePosts
    ?fetchFn({ pageParam, userId })
    :fetchFn({ pageParam }),
      
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 30 * 60 * 1000,   // 30 minutos
    refetchOnWindowFocus: false,
    retry: 2,
    maxPages: 10,
  });
}