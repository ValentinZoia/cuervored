"use client";
import {Suspense} from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { HandlerErrorBoundary } from "./Post/PostsErrorBoundary";
import PostList from './Post/PostList'
import SkeletonPost from "./Post/SkeletonPost";
import { getPostsFollowing, getPostsForYou } from "@/data/posts";
import { PostFeedType } from "@/types/Post";




export default function Publications() {
  

   
  

  return (
    <>
      
          <div className="w-full z-50 min-w-0 space-y-5 ">
            <Tabs defaultValue={PostFeedType.FOR_YOU} className="z-50">
          <TabsList className="sticky top-[82px] z-50  px-0 flex  space-x-4 bg-card border-[1px] border-border rounded-lg  ">
            <TabsTrigger className="w-1/2 " value={PostFeedType.FOR_YOU}>Para ti</TabsTrigger>
            <TabsTrigger className="w-1/2 " value={PostFeedType.FOLLOWING}>Siguiendo</TabsTrigger>
          </TabsList>
          <TabsContent value={PostFeedType.FOR_YOU}>
            <HandlerErrorBoundary>
              <Suspense fallback={<SkeletonPost />}>
              <PostList queryKey={PostFeedType.FOR_YOU} fetchFn={getPostsForYou} />
              </Suspense>
            </HandlerErrorBoundary>
          </TabsContent>
          <TabsContent value={PostFeedType.FOLLOWING}>
            <HandlerErrorBoundary>
              <Suspense fallback={<SkeletonPost />}>
              <PostList queryKey={PostFeedType.FOLLOWING} fetchFn={getPostsFollowing} />
              </Suspense>
            </HandlerErrorBoundary>
          </TabsContent>
        </Tabs>
          </div>
          
          
        
    </>
  );
}
