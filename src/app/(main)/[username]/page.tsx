import { auth } from "@/auth";
import UserCard from "@/components/users/UserCard";
import { getUserByUsername } from "@/data/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";



type MetaDataProps ={
    params:Promise<{username:string}>
}

//Definimos la metadata dinamica de la página
export async function generateMetadata({ params }: MetaDataProps): Promise<Metadata> {
    const username = (await params).username;

    if (!username) {
        notFound();
    }

    //usuario al cual corresponde el perfil que se esta viendo, NO EL LOGEADO
    const user = await getUserByUsername(username,"1");

    return {
      title: `${user.fullName ? user.fullName : user.name} (@${username})`,
      description: `Perfil de ${username}`,
      openGraph:{
        title: `${user.fullName ? user.fullName : user.name} (@${username})`,
        description: `Perfil de ${username}`,
        type:"profile",
        url:`${process.env.NEXT_PUBLIC_URL}/${username}`,
        siteName:"CuervoRed",
        
      }
    };
  }



interface UserProfilePageProps {
    params: { username: string };
  }

export default async function UserProfilePage({params:{username}}:UserProfilePageProps) {
    // const session = await auth();
    // if(!session?.user || !session){
    //     return(
    //         <p>
    //             Unauthorized to view this page
    //         </p>
    //     )
    // }

    // if(!username){
    //     notFound();
    // }

    // //usuario al cual corresponde el perfil que se esta viendo, NO EL LOGEADO
    // const user = await getUserByUsername(username, session.user.id);
    
    // if(!user){
    //     notFound();
    // }

    return(
        <div className="min-h-screen h-fit w-full">
           {/* <UserCard user={user} loggedInUserId={session.user.id}/>  */}
           hola
        </div>
    
)
}