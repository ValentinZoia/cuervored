
"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";

import { Post } from "./Post/Post";
import { getPosts } from "@/data/posts";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

import SkeletonPost from "./Post/SkeletonPost";
import { Post as PostType } from "@/types/Post";

interface PublicationsProps {
  children: React.ReactNode;
}


export default function Publications({ children }: PublicationsProps) {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<PostType[]>({
    queryKey: ["posts"],  //<-- La key de la información
    queryFn: getPosts,    //<-- Cómo traer la información
    staleTime:Infinity,   //<-- Cuanto tiempo mostrara la info desde cache sin hacer un refetch en segundo plano
    //cacheTime: 0,       //<-- Si no quieres que guarde la info en cache y hago un refetch cada vez que se renderiza
    
    
  });

  function ShowPosts() {
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

    if (posts) {
      return (
        <div className="relative z-10 space-y-6">
          {
            posts.map((post: PostType) => (
              <Post
                key={post.id}
                username={post.user.name ?? "Unknown"}
                avatar={post.user.image ?? ""}
                timeAgo={new Date(post.createdAt)}
                imageUrl={post.image ?? ""}
                likes={post.likes}
                content={post.content}
              />
            ))
          }
        </div>
      );
    }
    
  }

  return (
    <>
      <Card className="relative z-10 max-w-[680px] md:w-[680px] lg:w-[680px] bg-transparent border-none shadow-none lg:col-span-2 sm:mx-auto">
        <CardContent>
          {children}
          <ShowPosts />
        </CardContent>
      </Card>
    </>
  );
}
