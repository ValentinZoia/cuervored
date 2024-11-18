"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Send, Smile, User } from 'lucide-react'
import { compareDate } from '@/utils/compareDate'
import DropDownMenuPosts from './DropDownMenuPosts'
import { PostData} from '@/types/Post'
import { useSession } from 'next-auth/react'
import LikeButton from './LikeButton'
import InputComment from './comments/InputComment'
import ShowCommentsDialog from './comments/ShowCommentsDialog'
import UserHeaderPost from './UserHeaderPost'

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

  
  
  
  return (
    <>
    <Card className='group relative z-10 max-w-[680px] '>
      <CardHeader className="flex flex-row justify-between relative z-10 pb-2">
        <UserHeaderPost avatarUrl={avatar} username={username} timeAgo={timeAgo} />
        {session.status === "authenticated" && session.data.user.id === postUserId && (<DropDownMenuPosts post={post} className='opacity-50 group-hover:opacity-100  border-none ' />)}
       
      </CardHeader>
      <CardContent className="pb-2 relative z-10">
        {imageUrl ? (
          <Image
          src={imageUrl}
          alt="Imagen de la publicación"
          width={500}
          height={500}
          className="z-0 mb-4 mx-auto size-fit max-h-[30rem]"
        />
        ):(
          <p className=" relative z-10 text-sm mb-4 mt-2 whitespace-pre-line break-words">{content}</p>
        )}
        
        <div className="flex items-center space-x-4 mb-2">
          {<LikeButton postId={post.id} initialState={{
            likes: likes.length,
            isLikedByUser: post.likes.some(like => like.userId === session.data?.user.id)
          }} />}
          <Button variant="ghost" size="sm" onClick={() => setOpenDialogComments(true)}>
            <MessageCircle className="h-4 w-4 mr-2" />
            Comentar
          </Button>
          <Button variant="ghost" size="sm">
            <Send className="h-4 w-4 mr-2" />
            Compartir
          </Button>
        </div>
        
        {imageUrl !== '' && (<p className=" relative z-10 text-sm whitespace-pre-line break-words ">{content}</p>)}
        <div className="mt-2 cursor-pointer text-sm text-muted-foreground  " onClick={()=>setOpenDialogComments(true)}>
          {`Ver los ${post._count.comments} comentarios`}
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