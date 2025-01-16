
import React from "react";
import { Card, CardContent } from "./ui/card";
import PostForYou from "./Post/PostForYou";
import NewPost from "./NewPost/NewPost";
import { auth } from "@/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import PostFollowing from "./Post/PostFollowing";






export default async function Publications() {
  const session = await auth();

   
  

  return (
    <>
      <Card className="relative z-10 max-w-[680px] md:w-[680px] lg:w-[680px] bg-transparent border-none shadow-none  sm:mx-auto">
        <CardContent>
          <NewPost session={session}/>
          <div className="w-full z-50 min-w-0 space-y-5 ">
            <Tabs defaultValue="for-you" className="z-50">
          <TabsList className="sticky top-[82px] z-50  px-0 flex  space-x-4 bg-card border-[1px] border-border rounded-lg  ">
            <TabsTrigger className="w-1/2 " value="for-you">Para ti</TabsTrigger>
            <TabsTrigger className="w-1/2 " value="following">Siguiendo</TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <PostForYou/>
          </TabsContent>
          <TabsContent value="following">
            <PostFollowing/>
          </TabsContent>
        </Tabs>
          </div>
          
          
        </CardContent>
      </Card>
    </>
  );
}
