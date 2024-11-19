import { CommentsPage, PostData } from '@/types/Post';
import { InfiniteQueryPageParamsOptions, InitialPageParam, useQueryClient } from '@tanstack/react-query';
import { comment } from 'postcss';
import React from 'react'

interface Props {
    post: PostData
}

interface commentsPageType {
    
        pages: CommentsPage[];
        pageParams: (string | null)[];
     
}


export default function ShowCommentsParagraph({post}: Props) {
 const queryClient = useQueryClient();

 //obtenemos los comentarios del cache de la query, se actualizan a penas creamos el comentario
 const commentsData: commentsPageType | undefined  = queryClient.getQueryData(['comments', post.id]);
 const commentLengthCache = commentsData?.pages.map((page) => page.comments.length).reduce((a, b) => a + b, 0);

 //obtenemos la cantidad de comentarios de la base de datos, se actualiza cuando se recarga la pagina
 const commentLengthDB = post._count.comments;

    //si el cache y la db son distintos se renderiza. Osea que cuando se actualiza el cache, mostramos esa data
 if(commentLengthCache && (commentLengthCache !== commentLengthDB)) return <p>{`Ver ${commentLengthCache} comentarios`}</p>
 
 //se renderiza siempre que se recargue la pagina
    return (
    <p>{`Ver ${commentLengthDB} comentarios`}</p>
  )
}
