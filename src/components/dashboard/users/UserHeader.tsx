import React from 'react'
import UserAvatar from '../Post/UserAvatar'
import { UserData } from '@/types/Post'
import { Button } from '@/components/ui/button'
import EditProfileButton from './EditProfileButton'
import FollowButton from './FollowButton'

interface UserHeaderProps {
    user:UserData
    loggedInUserid: string;
}
export default function UserHeader({user, loggedInUserid}:UserHeaderProps) {
  return (
    <div className='w-full bg-card border-x-[1px]  h-auto flex flex-col items-stretch'>
        <div className='w-full h-1/2 bg-slate-700'>

        </div>

        <div className='h-1/2 mb-4 pt-3 px-4 flex flex-col items-stretch '>
            <div className='flex flex-row flex-wrap justify-between items-start w-full'>
                <div className='min-w-12 -mt-1 w-1/4 mb-3 h-auto overflow-visible'>
                    
                    <div className=''>
                        <UserAvatar avatarUrl={user?.image} username={user?.name} size="size-[100px]" />
                                
                        
                    </div>
                </div>
                <div className=''>
                    {user.id === loggedInUserid ? (
                        <EditProfileButton user={user} />
                    ) : (
                        <FollowButton />
                    )}
                    
                </div>
            </div>
            <div className='w-full flex flex-col justify-start items-start mb-4'>
                <h1 className='text-2xl font-bold'>{user?.fullName ? user?.fullName : user?.name ? user?.name : "Unknown"}</h1>
                <span className='text-muted-foreground'>@{user?.name}</span>
            </div>
            <div className='flex gap-4'>
                <p className='text-sm'>0<span className='text-muted-foreground '> Following</span></p>
                <p className='text-sm'>0<span className='text-muted-foreground'> Followers</span></p>
            </div>
        </div>
    </div>
  )
}
