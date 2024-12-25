import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { getUserDataSelect } from '@/types/Post'
import UserHeaderPost from '../Post/UserHeaderPost'
import { getUserById } from '@/data/user'

const recommendedUsers = [
  { name: 'Cuervo Fiel', username: '@cuervofiel', avatar: 'https://github.com/shadcn.png' },
  { name: 'Azulgrana Pasión', username: '@azulgranapasion', avatar: 'https://github.com/shadcn.png' },
  { name: 'Boedo de Corazón', username: '@boedodecorazon', avatar: 'https://github.com/shadcn.png' },
]

export async function RecommendedUsers() {
  const session = await auth();
  if(!session || !session.user) return null;

  //usuarios al cual el usuario logeado sigue
  const sessionUserFollowTo = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },
    select:{
      following:{
        select:{
          followingId: true
        }
      }

    }
  })
  
  // 3 o menos usuarios que no sigue el usuario logeado
  const usersToFollow = await prisma.user.findMany({
    where:{
      AND:[
        {
          NOT:{
            id: session.user.id
          }
        },
        {
          NOT:{
            id: {
              in: sessionUserFollowTo?.following.map(follow => follow.followingId)
            }
          }
        }
      ]
      
    },
    select:getUserDataSelect(session.user.id),
    take:3,
    
  });
  
  
  


  const baseUrl = process.env.NEXT_PUBLIC_URL;
  
  return (
    <Card className='hidden lg:block lg:col-span-1 lg:h-fit'>
      <CardHeader className='pb-2'>
        <CardTitle className="text-lg">Usuarios Recomendados</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {usersToFollow.map((user, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <div className="flex items-center space-x-2">
                  <UserHeaderPost username={user.name} avatarUrl={user.image} linkTo={`${baseUrl}/dashboard/users/${user.name}`} />
              </div>
              <Button size="sm" variant="outline" className='text-xs py-0 h-6'>Seguir</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}