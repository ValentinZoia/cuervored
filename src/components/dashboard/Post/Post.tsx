"use client"
import imageDontLoaded from '../../../../public/imageDontLoaded.webp'
import React, { useEffect, useState } from 'react'
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
  const content=post.content;
  const postUserId = post.userId;

  const session = useSession();

  const[openDialogComments, setOpenDialogComments] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(imageUrl);
  const [hasError, setHasError] = useState(false); 

  const LikeInfo: LikeInfo ={
    likes: post._count.likes,
    isLikedByUser: post.likes.some(like => like.userId === session.data?.user.id)
  }

  
  useEffect(() => {
    setCurrentSrc(imageUrl);
    setHasError(false);
  }, [post])
  
  
  
  
  return (
    <>
    <Card className='group relative z-0 max-w-[680px] rounded-none'>
      <CardHeader className="flex flex-row justify-between relative z-0 pb-2">
        <UserHeaderPost avatarUrl={avatar} username={username} timeAgo={timeAgo} />
        {session.status === "authenticated" && session.data.user.id === postUserId && (<PostMoreButton post={post} className='opacity-50 group-hover:opacity-100  border-none ' />)}
       
      </CardHeader>
      <CardContent className="pb-2 relative z-0">
        
        
        
        {imageUrl ? (
          <Image
          
          onClick={() => setOpenDialogComments(true)}
          src={ currentSrc}
          onError={() => 
          {
            if(!hasError){
              setCurrentSrc(imageDontLoaded.src);// Cambia a imagen de respaldo en caso de error
              setHasError(true);
            }
          }
          }
          unoptimized // Agrego esto por el error:hostname "res.cloudinary.com" is not configured under images in your next.config.js
          priority={true}
          alt="Imagen de la publicación"
          width={500}
          height={500}
          className="cursor-pointer z-0 mb-4 mx-auto size-fit max-h-[30rem]"
        />
        ):(
          <p className=" relative z-0 text-sm mb-4 mt-2 whitespace-pre-line break-words">{content}</p>
        )}
        
        <div className="flex items-center space-x-2 sm:space-x-4 mb-2">
          {<LikeButton postId={post.id} initialState={LikeInfo} />}
          <Button variant="ghost" size="sm" onClick={() => setOpenDialogComments(true)} className='flex items-center justify-center gap-2 hover:fill-blueSanlorenzo hover:text-blueSanlorenzo dark:hover:text-[#a2b6f8] hover:bg-[#00336634]'>
            <MessageCircle className="h-4 w-4 " />
            <span className='hidden sm:inline'>Comentar</span>
          </Button>
          
        </div>
        
        {imageUrl !== '' && (<p className=" relative z-0 text-sm whitespace-pre-line break-words ">{content}</p>)}
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