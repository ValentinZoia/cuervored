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
    default:"Home",
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
      <div className="min-h-screen w-full  ">
        <NavBar />
        <main className="flex-1  container py-8 px-2 ">
          <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna izquierda: Proximos partidos y Usarios recomendados */}
            <div className="space-y-6">
              <UpcomingMatches className="hidden"/>
              <RecommendedUsers />
            </div>

            {/* Columna Central: Page.tsx */}
            {children}
          </div>
        </main>
        
        <MenuBar className="sticky bottom-0 z-50 flex w-full justify-center gap-12 border-t bg-blueSanlorenzo text-primary-foreground p-3 md:hidden" />
        <Toaster />
      </div>
    </>
  );
};

export default DashboardLayout;
