"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {MessageCircle} from 'lucide-react'
import PostMoreButton from './PostMoreButton'
import { LikeInfo, PostData} from '@/types/Post'
import { useSession } from 'next-auth/react'
import LikeButton from './LikeButton'
import InputComment from './comments/InputComment'
import ShowCommentsDialog from './comments/ShowCommentsDialog'
import UserHeaderPost from './UserHeaderPost'
import ShowCommentsParagraph from './comments/ShowCommentsParagraph'

interface PostProps {
  post:PostData;
  
}

export function Post({ post }: PostProps) {
  const username = post.user.name ?? "Unknown";
  const avatar =post.user.image ?? "";
  const timeAgo=new Date(post.createdAt);
  const imageUrl=post.image ?? "";
  const likes=post.likes;
  const content=post.content;
  const postUserId = post.userId;

  const session = useSession();

  const[openDialogComments, setOpenDialogComments] = useState(false);

  const LikeInfo: LikeInfo ={
    likes: post._count.likes,
    isLikedByUser: post.likes.some(like => like.userId === session.data?.user.id)
  }

  

  
  
  
  return (
    <>
    <Card className='group relative z-10 max-w-[680px] rounded-none'>
      <CardHeader className="flex flex-row justify-between relative z-10 pb-2">
        <UserHeaderPost avatarUrl={avatar} username={username} timeAgo={timeAgo} />
        {session.status === "authenticated" && session.data.user.id === postUserId && (<PostMoreButton post={post} className='opacity-50 group-hover:opacity-100  border-none ' />)}
       
      </CardHeader>
      <CardContent className="pb-2 relative z-10">
        {imageUrl ? (
          <Image
          onClick={() => setOpenDialogComments(true)}
          src={imageUrl}
          alt="Imagen de la publicación"
          width={500}
          height={500}
          className="cursor-pointer z-0 mb-4 mx-auto size-fit max-h-[30rem]"
        />
        ):(
          <p className=" relative z-10 text-sm mb-4 mt-2 whitespace-pre-line break-words">{content}</p>
        )}
        
        <div className="flex items-center space-x-2 sm:space-x-4 mb-2">
          {<LikeButton postId={post.id} initialState={LikeInfo} />}
          <Button variant="ghost" size="sm" onClick={() => setOpenDialogComments(true)} className='flex items-center justify-center gap-2 hover:fill-blueSanlorenzo hover:text-blueSanlorenzo hover:bg-[#00336634]'>
            <MessageCircle className="h-4 w-4 " />
            <span className='hidden sm:inline'>Comentar</span>
          </Button>
          
        </div>
        
        {imageUrl !== '' && (<p className=" relative z-10 text-sm whitespace-pre-line break-words ">{content}</p>)}
        <div className="mt-2 cursor-pointer text-sm text-muted-foreground  " onClick={()=>setOpenDialogComments(true)}>
        
          <ShowCommentsParagraph post={post} />
        </div>
        <div className="mt-2 flex items-center ">
          <InputComment post={post}  />
        </div>
      </CardContent>
    </Card>
    <ShowCommentsDialog post={post} open={openDialogComments} setOpen={setOpenDialogComments} />
    </>
    
  )
}