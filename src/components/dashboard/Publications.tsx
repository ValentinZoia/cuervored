
"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";

import { Post } from "./Post/Post";
import { getPosts } from "@/data/posts";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, Divide } from "lucide-react";

import SkeletonPost from "./Post/SkeletonPost";
import { PostsPage, Post as PostType } from "@/types/Post";
import { useSession } from "next-auth/react";
import NewPostClient from "./NewPost/NewPost";




export default function Publications() {
  const session = useSession();

  
  
  // const {
  //   data: posts,
  //   isLoading,
  //   error,
  // } = useQuery<PostType[]>({
  //   queryKey: ["posts"],  
  //   queryFn: getPosts,    
  //   staleTime:Infinity,   
  //   //cacheTime: 0,       //<-- Si no quieres que guarde la info en cache y hago un refetch cada vez que se renderiza
    
    
  // });

   // Configuración de `useInfiniteQuery`
   const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["posts"],//<-- La key de la información
    queryFn: ({ pageParam = 1 }: {pageParam?: string | number | null | undefined}) => getPosts({pageParam} ), //<-- Cómo traer la información
    initialPageParam:null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor?? undefined, // Define el siguiente parámetro de paginación
    staleTime: Infinity,//<-- Cuanto tiempo mostrara la info desde cache sin hacer un refetch en segundo plano
  });

  function ShowPosts() {

    if(!session){
      return 
    }

    if (isLoading) {
      return <SkeletonPost />;
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : "Unexpected error"}
          </AlertDescription>
        </Alert>
      );
    }

    if (data) {
      console.log(data);
      // return (
      //   <div className="relative z-10 space-y-6">
      //     {data.pages.flatMap((page) =>
      //       page.map((post: PostType) => (
      //         <Post
      //           key={post.id}
      //           username={post.user.name ?? "Unknown"}
      //           avatar={post.user.image ?? ""}
      //           timeAgo={new Date(post.createdAt)}
      //           imageUrl={post.image ?? ""}
      //           likes={post.likes}
      //           content={post.content}
      //         />
      //       ))
      //     )}
      //     {hasNextPage && (
      //       <button
      //         onClick={() => fetchNextPage()}
      //         disabled={isFetchingNextPage}
      //       >
      //         {isFetchingNextPage ? "Cargando..." : "Cargar más"}
      //       </button>
      //     )}
      //   </div>
      // );
    }
    
  }

  return (
    <>
      <Card className="relative z-10 max-w-[680px] md:w-[680px] lg:w-[680px] bg-transparent border-none shadow-none lg:col-span-2 sm:mx-auto">
        <CardContent>
          <NewPostClient/>
          <ShowPosts />
        </CardContent>
      </Card>
    </>
  );
}
