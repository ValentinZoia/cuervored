import { auth } from "@/auth";
import UserCard from "@/components/dashboard/users/UserCard";
import { getUserByUsername } from "@/data/user";
import { notFound } from "next/navigation";

interface UserProfilePageProps {
    params: { username: string };
  }

export default async function UserProfilePage({params:{username}}:UserProfilePageProps) {
    const session = await auth();
    if(!session?.user || !session){
        return(
            <p>
                Unauthorized to view this page
            </p>
        )
    }

    if(!username){
        notFound();
    }

    //usuario al cual corresponde el perfil que se esta viendo, NO EL LOGEADO
    const user = await getUserByUsername(username, session.user.id);
    
    if(!user){
        notFound();
    }

    return(
        <div className="min-h-screen h-fit w-full">
           <UserCard user={user} loggedInUserId={session.user.id}/> 
        </div>
    
)
}