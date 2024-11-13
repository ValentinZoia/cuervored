
"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";

import { Post } from "./Post/Post";
import { getPosts } from "@/data/posts";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, Divide, Loader } from "lucide-react";

import SkeletonPost from "./Post/SkeletonPost";
import { PostsPage, PostData as PostType } from "@/types/Post";
import { useSession } from "next-auth/react";
import NewPostClient from "./NewPost/NewPost";
import InfiniteScrollContainer from "./InfiniteScrollContainer";




export default function Publications() {
  const session = useSession();

  

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
    queryFn: ({ pageParam}: {pageParam?: string | number | null | undefined}) => getPosts({pageParam} ), //<-- Cómo traer la información
    initialPageParam:null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined, // Define el siguiente parámetro de paginación
    staleTime: Infinity,//<-- Cuanto tiempo mostrara la info desde cache sin hacer un refetch en segundo plano
  });

  function ShowPosts() {
    
    if(!session){
      return <SkeletonPost />
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

    if (data && session) {
      
      return (
        <InfiniteScrollContainer className="relative z-10 space-y-6" onBottomReached={()=> hasNextPage && !isLoading && fetchNextPage()}>
          {data.pages.flatMap((page) =>
            page.posts.map((post: PostType) => (
              <Post
                key={post.id}
                post={post}
              />
            ))
          )}
          {isFetchingNextPage && <Loader className="mx-auto animate-spin" />}
        </InfiniteScrollContainer>
      );
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
