import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react';
import React from 'react'

interface UserAvatarProps {
    avatarUrl: string | null | undefined
    username: string
    size?: number
}
export default function UserAvatar({avatarUrl, username,size}: UserAvatarProps) {
  const fallback = username[0] || <User className="h-4 w-4" />;
  
  return (
    <Avatar className={`relative z-10 ${size ? "size-" + size : "size-10"} `} >
      {avatarUrl ?(
        <AvatarImage src={avatarUrl} alt={username} />
      ):(null)}
            
            <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
