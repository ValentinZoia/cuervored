
"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { useSession } from "next-auth/react";
import PostList from "./Post/PostList";
import NewPost from "./NewPost/NewPost";
import SkeletonNewPost from "./NewPost/SkeletonNewPost";
import SkeletonPost from "./Post/SkeletonPost";





export default function Publications() {
  const session = useSession();

  if(!session.data){
    return (
      <Card className="relative z-10 max-w-[680px] md:w-[680px] lg:w-[680px] bg-transparent border-none shadow-none lg:col-span-2 sm:mx-auto">
        <CardContent>
          <SkeletonNewPost />
          <SkeletonPost/>
        </CardContent>
      </Card>
    )
  }

   
  

  return (
    <>
      <Card className="relative z-10 max-w-[680px] md:w-[680px] lg:w-[680px] bg-transparent border-none shadow-none lg:col-span-2 sm:mx-auto">
        <CardContent>
          <NewPost/>
          <PostList/>
        </CardContent>
      </Card>
    </>
  );
}
