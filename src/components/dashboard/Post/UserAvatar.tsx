import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react';
import React from 'react'

interface UserAvatarProps {
    avatarUrl: string | null | undefined
    username: string |  null | undefined
    size?: string
}
export default function UserAvatar({avatarUrl, username,size}: UserAvatarProps) {
  const fallback = username?.[0]  || <User className="h-4 w-4" />;
  
  return (
    <Avatar className={size}  >
      {avatarUrl ?(
        <AvatarImage src={avatarUrl} alt={username as string}  />
      ):(null)}
            
            <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
