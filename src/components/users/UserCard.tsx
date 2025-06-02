"use client"
import { Card } from "@/components/ui/card";
import { UserData } from "@/types/User";
import UserNav from "./UserNav";
import UserHeader from "./UserHeader";
import PostList from "../Post/PostList";
import { getUserPosts } from "@/data/posts";
import { HandlerErrorBoundary } from "../Post/PostsErrorBoundary";
import { Suspense } from "react";
import SkeletonPost from "../Post/SkeletonPost";


interface UserCardProps {
    user:UserData; //usuario al cual corresponde el perfil que se esta viendo, NO EL LOGEADO
    loggedInUserId:string;
  }

export default function UserCard({user, loggedInUserId}:UserCardProps) {
  

    
    return(
        <Card className="relative z-10 max-w-[680px] md:w-[680px] lg:w-[680px]  min-h-screen h-fit border-none shadow-none bg-transparent lg:col-span-2 mx-auto w-[100%] mb-4">
            <UserNav  text_2={user.name} text_1={user.fullName}/>
            <UserHeader user={user} loggedInUserId={loggedInUserId}/>
            <HandlerErrorBoundary>
                <Suspense fallback={<SkeletonPost />}>
                   <PostList fetchFn={getUserPosts} queryKey={user.id} isUserPagePosts={true} /> 
                </Suspense>
            </HandlerErrorBoundary>
            
            
        </Card>
    
)
}