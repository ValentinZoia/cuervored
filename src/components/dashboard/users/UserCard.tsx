

import { Card } from "@/components/ui/card";

import { UserData } from "@/types/Post";
import UserNav from "./UserNav";
import UserHeader from "./UserHeader";
import UserPosts from "./UserPosts";


interface UserCardProps {
    user:UserData
    loggedInUserid:string
  }

export default function UserCard({user, loggedInUserid}:UserCardProps) {
  

    
    return(
        <Card className="relative z-10 max-w-[680px] md:w-[680px] lg:w-[680px] bg-transparent border-none shadow-none  lg:col-span-2 mx-auto w-[100%]">
            <UserNav  username={user.name}/>
            <UserHeader user={user} loggedInUserid={loggedInUserid}/>
            <UserPosts userId={user.id}/>
            
        </Card>
    
)
}