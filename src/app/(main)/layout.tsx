
import Footer from "@/components/Footer";
import { LoadMoreSpinner } from "@/components/LoadMoreSpinner";
import MenuBar from "@/components/NavBar/MenuBar";
import NavBar from "@/components/NavBar/NavBar";
import { Toaster } from "@/components/ui/toaster";
import UpcomingMatches from "@/components/UpcomingMatches/UpcomingMatches";
import { Metadata } from "next";
import dynamic from "next/dynamic";


interface MainLayoutProps {
  children: React.ReactNode;
}

export const metadata:Metadata ={
  title:{
    default:"Inicio",
    template:" %s | CuervoRed",
  },
  authors:[{name:"Valentin Zoia"}],
    creator:"Valentin Zoia",
    publisher:"Valentin Zoia",
    keywords:["San Lorenzo","Red Social","Hinchas","Futbol","Argentina","CuervoRed","Cuervo","SL","San Lorenzo de Almagro","Valentin Zoia","Iker Muniain","AzulGrana","oficial","Oficial","Moretti","Valentin","Zoia","Iker","Muniain","Moretti","Azul","Grana","SLdeA","SLdeAlmagro","SLdeAlmagroOficial","SLdeA"],
  
  
  
}




const RecommendedUsers = dynamic(() => import('@/components/WhoToFollow/RecommendedUsers').then(mod => mod.RecommendedUsers), {ssr: false, loading: () => <LoadMoreSpinner />});

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>

      <div className="min-h-screen flex flex-col">
      <NavBar />
      {children}
      <Footer />
          <MenuBar className="sticky bottom-0 z-40 flex w-full justify-center gap-12 border-t bg-blueSanlorenzo text-primary-foreground p-3 md:hidden" />
      
    </div>
    <Toaster />
    </>
  );
};

export default MainLayout;