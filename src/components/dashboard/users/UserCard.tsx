

import { Card } from "@/components/ui/card";

import { UserData } from "@/types/Post";
import UserNav from "./UserNav";
import UserHeader from "./UserHeader";
import UserPosts from "./UserPosts";

interface UserCardProps {
    user:UserData
  }

export default function UserCard({user}:UserCardProps) {
  
    
    return(
        <Card className="relative z-10 max-w-[680px] md:w-[680px] lg:w-[680px] bg-card  lg:col-span-2 sm:mx-auto">
            <UserNav  username={user.name}/>
            <UserHeader user={user}/>
            <UserPosts/>
            
        </Card>
    
)
}