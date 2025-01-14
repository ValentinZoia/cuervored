import MenuBar from "@/components/dashboard/NavBar/MenuBar";
import NavBar from "@/components/dashboard/NavBar/NavBar";
import { RecommendedUsers } from "@/components/dashboard/WhoToFollow/RecommendedUsers";
import UpcomingMatches from "@/components/dashboard/UpcomingMatches/UpcomingMatches";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata:Metadata ={
  title:{
    default:"Inicio",
    template:" %s | CuervoRed",
  },
  description:"Una simple red social para hinchas de San lorenzo.",
  twitter:{
    card:"summary_large_image",
  },
  authors:[{name:"Valentin Zoia"}],
  creator:"Valentin Zoia",
  publisher:"Valentin Zoia",
  keywords:["San Lorenzo","Red Social","Hinchas","Futbol","Argentina","CuervoRed","Cuervo","SL","San Lorenzo de Almagro","Valentin Zoia","Iker Muniain","AzulGrana","oficial","Oficial","Moretti","Valentin","Zoia","Iker","Muniain","Moretti","Azul","Grana","SLdeA","SLdeAlmagro","SLdeAlmagroOficial","SLdeA"],
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 container py-8 px-2">
        <div className="flex justify-center gap-1">
          <aside className="hidden lg:block w-[350px] space-y-4 ">
            <div className="sticky top-24">
              <UpcomingMatches />
            </div>
          </aside>
          
          <main className="w-full max-w-[700px] flex-shrink-0">
            {children}
          </main>

          <aside className="hidden lg:block w-[300px] space-y-4 ">
            <div className="sticky top-24">
              <RecommendedUsers />
            </div>
          </aside>
        </div>
      </div>
      
      <MenuBar className="sticky bottom-0 z-50 flex w-full justify-center gap-12 border-t bg-blueSanlorenzo text-primary-foreground p-3 md:hidden" />
      <Toaster />
    </div>
    </>
  );
};

export default DashboardLayout;
