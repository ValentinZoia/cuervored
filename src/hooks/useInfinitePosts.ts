// useInfinitePosts.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { PostData } from "@/types/Post";

interface PostsResponse {
  posts: PostData[];
  nextCursor: string | null;
}

interface UseInfinitePostsProps {
  queryKey: string;
  fetchFn: (params: { pageParam?: string | number | null }) => Promise<PostsResponse>;
}

export function useInfinitePosts({ queryKey, fetchFn }: UseInfinitePostsProps) {
  return useInfiniteQuery({
    queryKey: ["post-feed", queryKey],
    queryFn: ({ pageParam  }) => fetchFn({ pageParam }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}