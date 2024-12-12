"use client"
import { getAllUsersByUsername, getUserByUsername } from '@/data/user'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import UserNav from '../users/UserNav';
import UserAvatar from '../Post/UserAvatar';

export default function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    if(!query){
        return <p>No se encontraron resultados</p>
    }

    

    const {
      data,
      isLoading,
      error,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useInfiniteQuery({
      queryKey: ["search"], //<-- La key de la información
      queryFn: ({
        pageParam,
        
      }: {
        pageParam?: string | number | null | undefined;
        username?: string | null | undefined;
      }) => getAllUsersByUsername({ pageParam,username:query }), //<-- Cómo traer la información
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined, // Define el siguiente parámetro de paginación
      
      
      
  
    });
  
    
  console.log(data);
  
  
  
    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    if (!data) {
      return <p>No data</p>;
    }
  
    return (
    <div className="w-full bg-card border-x-[1px]  h-auto flex flex-col items-stretch">
      {data.pages.map((page) => (
        <div key={page.nextCursor}>
          {page.users.map((user) => (
            <div key={user.id} className="w-full h-1/2 bg-slate-700">
              <UserAvatar
                avatarUrl={user.image}
                username={user.name}
                size="size-[100px]"
              />
              <h1 className='text-slate-300'>{user.name}</h1>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
