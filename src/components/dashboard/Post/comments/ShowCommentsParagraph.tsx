import { CommentsPage, PostData } from '@/types/Post';
import { InfiniteQueryPageParamsOptions, InitialPageParam, useQueryClient } from '@tanstack/react-query';
import { comment } from 'postcss';
import React from 'react'

interface Props {
    post: PostData
}




export default function ShowCommentsParagraph({post}: Props) {

    return (
    <p>{`Ver ${post?._count?.comments} comentarios`}</p>
  )
}
