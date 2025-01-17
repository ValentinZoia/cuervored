import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '@/data/posts';
import { PostData,CommentData} from '@/types/Post';

export function useComments(post: PostData) {
  //traer todos los comentarios del post con post.id
  const {
    data,
    isLoading,
    isFetching,
    error,
    status,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", post.id],
    queryFn: ({ pageParam }) => getComments({ 
      pageParam, 
      postId: post.id 
    }),
    initialPageParam: null as string | null,
    getNextPageParam: (firstPage) => firstPage.previousCursor ?? undefined,
    select: (data) => ({
      pages: [...data.pages].reverse(),
      pageParams: [...data.pageParams].reverse(),
    }),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60, // 1 hora
  });

  const comments:CommentData[] = data?.pages.flatMap(page => page.comments) || [];

  return {
    comments,
    isLoading,
    isFetching,
    error,
    status,
    fetchNextPage,
    hasNextPage,
  };
}