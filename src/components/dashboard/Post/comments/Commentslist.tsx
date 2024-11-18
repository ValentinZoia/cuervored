import { Button } from '@/components/ui/button';
import { getComments } from '@/data/posts';
import { PostData } from '@/types/Post';
import { useInfiniteQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react';
import React from 'react'
import Comment from './Comment';

export default function Commentslist({post}: {post: PostData}) {
  
    const {
        data,
        isLoading,
        isFetching,
        error,
        status,
        fetchNextPage,
        hasNextPage,
        
      } = useInfiniteQuery({
        queryKey: ["comments",post.id], //<-- La key de la información
        queryFn: ({
          pageParam,
          
        }: {
          pageParam?: string | number | null | undefined;
          
        }) => getComments({ pageParam, postId: post.id }), //<-- Cómo traer la información
        initialPageParam: null as string | null,
        getNextPageParam: (firstPage) => firstPage.previousCursor ?? undefined, // Define el siguiente parámetro de paginación
        select: (data) => ({
            pages: [...data.pages].reverse(),
            pageParams: [...data.pageParams].reverse(),
          }),
        staleTime: Infinity, //<-- Cuanto tiempo mostrara la info desde cache sin hacer un refetch en segundo plano
      });

      if (isLoading) return "Cargando...";
      if(error){
        return <p>Ocurrio un error al cargar los comentarios</p>
      }

      const comments = data?.pages.flatMap(page => page.comments) || []
      
  
  
    return (
    <div className='space-y-3'>
         {hasNextPage && (
        <Button
          variant="link"
          className="mx-auto block"
          disabled={isFetching}
          onClick={() => fetchNextPage()}
        >
          Load previous comments
        </Button>
      )}
      {status === "pending" && <Loader2 className="mx-auto animate-spin" />}
      {status === "success" && !comments.length && (
        <p className="text-center text-muted-foreground">No comments yet.</p>
      )}
      
      <div className="divide-y">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
