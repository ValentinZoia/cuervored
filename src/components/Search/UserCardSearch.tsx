import { UserData } from '@/types/Post'
import Link from 'next/link';
import React from 'react'
import UserHeaderPost from '../Post/UserHeaderPost';

interface UserHeaderPostProps {
    user:UserData;
    baseUrl:string;
}

export function UserCardSearch({user,baseUrl}:UserHeaderPostProps) {
  return (
    <Link
          key={user.id}
          href={`${baseUrl}/${user.name}`}
          aria-label={`Ver perfil de ${user.name}`}
        >
          <div className="w-full h-1/2 p-4 hover:bg-secondary border-b-[1px]">
            <UserHeaderPost
              username={user.name}
              avatarUrl={user.image}
              linkTo={`${baseUrl}/${user.name}`}
            />
          </div>
        </Link>
  )
}