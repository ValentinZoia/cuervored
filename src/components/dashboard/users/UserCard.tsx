

import { Card } from "@/components/ui/card";

import { UserData } from "@/types/Post";
import UserNav from "./UserNav";
import UserHeader from "./UserHeader";
import UserPosts from "./UserPosts";


interface UserCardProps {
    user:UserData;
    loggedInUserId:string;
  }

export default function UserCard({user, loggedInUserId}:UserCardProps) {
  

    
    return(
        <Card className="relative z-10 max-w-[680px] md:w-[680px] lg:w-[680px] bg-card min-h-screen h-fit border-none shadow-none  lg:col-span-2 mx-auto w-[100%] mb-4">
            <UserNav  username={user.name} full_name={user.fullName}/>
            <UserHeader user={user} loggedInUserId={loggedInUserId}/>
            <UserPosts userId={user.id}/>
            
        </Card>
    
)
}