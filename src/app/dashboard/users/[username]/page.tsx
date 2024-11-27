import { auth } from "@/auth";
import UserCard from "@/components/dashboard/users/UserCard";
import { getUserByUsername } from "@/data/user";

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
        return(
            <p>
                Usuario no encontrado
            </p>
        )
    }

    const user = await getUserByUsername(username, session.user.id);
    
    return(
        <div className="h-fit">
           <UserCard user={user} loggedInUserId={session.user.id}/> 
        </div>
    
)
}