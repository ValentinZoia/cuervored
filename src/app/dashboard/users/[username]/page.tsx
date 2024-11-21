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

    const user = await getUserByUsername(username, session.user.id);
    
    return(
    <UserCard user={user} />
)
}