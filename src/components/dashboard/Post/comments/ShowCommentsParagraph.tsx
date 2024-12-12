import { CommentsPage, PostData } from '@/types/Post';
import { InfiniteQueryPageParamsOptions, InitialPageParam, useQuery, useQueryClient } from '@tanstack/react-query';
import { comment } from 'postcss';
import React from 'react'
import { getCommentCount } from './actions';

interface Props {
    post: PostData
}




export default function ShowCommentsParagraph({post}: Props) {

    const {data} = useQuery({
      queryKey:["commentCount", post.id],
      queryFn: async () =>  await getCommentCount(post.id),
      initialData: post._count?.comments,
      staleTime: Infinity
    })




    return (
    <p>{`Ver ${data} comentarios`}</p>
  )
}
