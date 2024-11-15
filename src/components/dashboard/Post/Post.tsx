"use client"
import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Send, Smile } from 'lucide-react'
import { compareDate } from '@/utils/compareDate'
import DropDownMenuPosts from './DropDownMenuPosts'
import { PostData} from '@/types/Post'
import { useSession } from 'next-auth/react'
import LikeButton from './LikeButton'
import InputComment from './comments/InputComment'

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

  
  
  
  return (
    <Card className='group relative z-10 max-w-[680px] '>
      <CardHeader className="flex flex-row justify-between relative z-10 pb-2">
        <div className="relative z-10 flex items-center space-x-4">
          <Avatar className='relative z-10'>
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username[0] ?? 'Unknown'}</AvatarFallback>
          </Avatar>
          <div className='relative z-10'>
            <p className="text-sm font-medium relative z-0">{username}</p>
            <p className="text-xs text-muted-foreground relative z-10">{compareDate(timeAgo)}</p>
          </div>
        </div>
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
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            Comentar
          </Button>
          <Button variant="ghost" size="sm">
            <Send className="h-4 w-4 mr-2" />
            Compartir
          </Button>
        </div>
        
        {imageUrl !== '' && (<p className=" relative z-10 text-sm whitespace-pre-line break-words ">{content}</p>)}
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">Ver los 45 comentarios</p>
        </div>
        <div className="mt-2 flex items-center ">
          <InputComment post={post} />
        </div>
      </CardContent>
    </Card>
  )
}