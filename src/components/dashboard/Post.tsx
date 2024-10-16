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
    <Card className='z-10'>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className='relative z-10'>
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{username}</p>
            <p className="text-xs text-muted-foreground">{compareDate(timeAgo)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {imageUrl ? (
          <Image
          src={imageUrl}
          alt="Imagen de la publicación"
          width={500}
          height={500}
          className="rounded-md mb-4"
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