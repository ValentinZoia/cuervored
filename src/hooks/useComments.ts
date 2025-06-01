import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '@/data/posts';
import { PostData,CommentData, QueryKeys} from '@/types/Post';

export function useComments(post: PostData) {
  //traer todos los comentarios del post con post.id
  return useSuspenseInfiniteQuery({
    queryKey: [QueryKeys.COMMENTS, post.id],
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
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 30 * 60 * 1000,   // 30 minutos
  });

  

  
}