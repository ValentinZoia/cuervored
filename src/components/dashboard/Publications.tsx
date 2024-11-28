
import React from "react";
import { Card, CardContent } from "../ui/card";
import PostList from "./Post/PostList";
import NewPost from "./NewPost/NewPost";
import { auth } from "@/auth";






export default async function Publications() {
  const session = await auth();

   
  

  return (
    <>
      <Card className="relative z-10 max-w-[680px] md:w-[680px] lg:w-[680px] bg-transparent border-none shadow-none lg:col-span-2 sm:mx-auto">
        <CardContent>
          <NewPost session={session}/>
          <PostList/>
        </CardContent>
      </Card>
    </>
  );
}
