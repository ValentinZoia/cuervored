import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import NewPost from "../NewPost/NewPost";
import { Post } from "./Post";
import { getPosts } from "@/data/posts";

export default async function Publications() {
  const posts = await getPosts();
  

  return (
    <>
      <Card className="max-w-[680px] bg-transparent border-none shadow-none lg:col-span-2 sm:mx-auto">
        
        <CardContent>
          <NewPost />
          <div className="space-y-6">
              {posts && posts.map((post) => (
                <Post
                  key={post.id}
                  username={post.user.name as string}
                  avatar={post.user.image as string}
                  timeAgo={post.createdAt}
                  imageUrl={post.image ? post.image as string : ''}
                  likes={post.likes}
                  content={post.content}
                />
              ))}

            
          </div>
        </CardContent>
      </Card>
    </>
  );
}
