import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react';
import React from 'react'

type ImageType = 'profileSmall' | 'profileLarge';

interface UserAvatarProps {
    avatarUrl: string | null | undefined
    username: string | null | undefined
    imageType: ImageType 
}

export default function UserAvatar({ avatarUrl, username, imageType }: UserAvatarProps) {
    // Fallback con User icon si no hay primera letra del username
    const fallback = username ? username[0]?.toUpperCase() : <User className="h-4 w-4" />;

    // Objeto con las dimensiones según el tipo
    const avatarSize = {
        profileSmall: 40,
        profileLarge: 100
    }

    // Clase dinámica según el tipo de imagen
    const sizeClass = imageType === 'profileSmall' ? 'h-10 w-10' : 'h-24 w-24';
    
    return (
        <Avatar className={sizeClass}>
            {avatarUrl && (
                <AvatarImage 
                    src={avatarUrl} 
                    alt={username || 'User avatar'} 
                    width={avatarSize[imageType]} 
                    height={avatarSize[imageType]}
                />
            )}
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    )
}