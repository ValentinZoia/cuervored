import { PostData, QueryKeys } from '@/types/Post';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getCommentCount } from './actions';

interface Props {
    post: PostData
}




export default function ShowCommentsParagraph({post}: Props) {

    const {data} = useQuery({
      queryKey:[QueryKeys.COMMENT_COUNT, post.id],
      queryFn: async () =>  await getCommentCount(post.id),
      initialData: post._count?.comments,
      staleTime: Infinity
    })




    return (
    <p>{`Ver ${data} comentarios`}</p>
  )
}
