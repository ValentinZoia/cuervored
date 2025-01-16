import MenuBar from "@/components/NavBar/MenuBar";
import NavBar from "@/components/NavBar/NavBar";
import { Metadata } from "next";

export const metadata:Metadata={
  title:"Configuracion",
  description:"Configura tu cuenta en CuervoRed y disfruta de una simple red social para hinchas de San lorenzo."
}  

  export default function SettingsPage() {
    return (
      <>
      <NavBar />
      <main className="min-h-screen h-fit w-full">
       Settings Page
      </main>
      <MenuBar className="sticky bottom-0 z-50 flex w-full justify-center gap-12 border-t bg-blueSanlorenzo text-primary-foreground p-3 md:hidden" />
      </>
      
    );
  }
  