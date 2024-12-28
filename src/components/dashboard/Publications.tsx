
import React from "react";
import { Card, CardContent } from "../ui/card";
import PostForYou from "./Post/PostForYou";
import NewPost from "./NewPost/NewPost";
import { auth } from "@/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PostFollowing from "./Post/PostFollowing";






export default async function Publications() {
  const session = await auth();

   
  

  return (
    <>
      <Card className="relative z-10 max-w-[680px] md:w-[680px] lg:w-[680px] bg-transparent border-none shadow-none lg:col-span-2 sm:mx-auto">
        <CardContent>
          <NewPost session={session}/>
          <div className="w-full min-w-0 space-y-5 ">
            <Tabs defaultValue="for-you">
          <TabsList className="px-0 flex  space-x-4 bg-card border-[1px] border-border rounded-lg dark:text-primary-foreground ">
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
