"use client"
import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Send, Smile } from 'lucide-react'
import { compareDate } from '@/utils/compareDate'

interface PostProps {
  username: string
  avatar: string
  timeAgo: Date
  imageUrl: string
  likes: String[]
  content: string
  
}

export function Post({ username, avatar, timeAgo, imageUrl, likes, content }: PostProps) {
  
  
  
  
  return (
    <Card className='relative z-10 max-w-[680px] '>
      <CardHeader className="relative z-10 pb-2">
        <div className="relative z-10 flex items-center space-x-4">
          <Avatar className='relative z-10'>
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
          <div className='relative z-10'>
            <p className="text-sm font-medium relative z-0">{username}</p>
            <p className="text-xs text-muted-foreground relative z-10">{compareDate(timeAgo)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 relative z-10">
        {imageUrl ? (
          <Image
          src={imageUrl}
          alt="Imagen de la publicación"
          width={600}
          height={600}
          className="z-0 rounded-md mb-4 m-auto"
        />
        ):(
          <p className=" relative z-10 text-sm mb-4 mt-2 whitespace-pre-line break-words">{content}</p>
        )}
        
        <div className="flex items-center space-x-4 mb-2">
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Me gusta
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            Comentar
          </Button>
          <Button variant="ghost" size="sm">
            <Send className="h-4 w-4 mr-2" />
            Compartir
          </Button>
        </div>
        <p className="relative z-10 text-sm font-medium mb-1 ">{likes.length} Me gusta</p>
        {imageUrl !== '' && (<p className=" relative z-10 text-sm whitespace-pre-line break-words ">{content}</p>)}
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">Ver los 45 comentarios</p>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <Input placeholder="Agregar un comentario..." className="flex-1" />
          <Button size="sm" variant="ghost">
            <Smile className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}