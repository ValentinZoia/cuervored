import MenuBar from "@/components/dashboard/NavBar/MenuBar";
import NavBar from "@/components/dashboard/NavBar/NavBar";
import { RecommendedUsers } from "@/components/dashboard/RecommendedUsers";
import UpcomingMatches from "@/components/dashboard/UpcomingMatches";
import { Toaster } from "@/components/ui/toaster";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <div className="min-h-screen w-full ">
        <NavBar />
        <main className="flex-1  container py-8 px-2">
          <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna izquierda: Proximos partidos y Usarios recomendados */}
            <div className="space-y-6">
              <UpcomingMatches />
              <RecommendedUsers />
            </div>

            {/* Columna Central: Page.tsx */}
            {children}
          </div>
        </main>
        
        <MenuBar className="sticky bottom-0 z-50 flex w-full justify-center gap-12 border-t bg-primary text-primary-foreground p-3 md:hidden" />
        <Toaster />
      </div>
    </>
  );
};

export default DashboardLayout;
