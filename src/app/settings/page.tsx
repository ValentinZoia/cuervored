import { auth } from "@/auth";
import MenuBar from "@/components/NavBar/MenuBar";
import NavBar from "@/components/NavBar/NavBar";
import ClientEditProfile from "@/components/settings/ClientEditProfile";
import DeleteAccountCard from "@/components/settings/DeleteAccountCard";
import { getUserDataById } from "@/data/user";
import { UserData } from "@/types/User";
import { Metadata } from "next";


export const metadata:Metadata={
  title:"Configuracion",
  description:"Configura tu cuenta en CuervoRed y disfruta de una simple red social para hinchas de San lorenzo."
}  




  export default async function SettingsPage() {
    
   const session = await auth();
   const user:UserData = await getUserDataById(session?.user.id as string);
    
    
    
    
    return (
      <>
      <NavBar />
      <main className=" container max-w-[1600px] py-10">
        <h1 className="text-3xl font-bold mb-6">Configuracion de la cuenta</h1>
        
         <ClientEditProfile user={user} />
        <DeleteAccountCard session={session} />
      </main>
      <MenuBar className="sticky bottom-0 z-50 flex w-full justify-center gap-12 border-t bg-blueSanlorenzo text-primary-foreground p-3 md:hidden" />
      </>
      
    );
  }
  