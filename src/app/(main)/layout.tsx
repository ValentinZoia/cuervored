
import { LoadMoreSpinner } from "@/components/LoadMoreSpinner";
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
  
  
}




const RecommendedUsers = dynamic(() => import('@/components/WhoToFollow/RecommendedUsers').then(mod => mod.RecommendedUsers), {ssr: false, loading: () => <LoadMoreSpinner />});

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
      
      <div className="flex-1 container max-w-[1600px] mx-auto py-8 px-2">
        <div className="flex justify-center gap-6">
          <aside className="hidden lg:block w-[450px] space-y-4 ">
            <div className="sticky top-24">
              <UpcomingMatches />
            </div>
          </aside>
          
          <main className="w-full max-w-[700px] flex-shrink-0">
            {children}
          </main>

          <aside className="hidden lg:block w-[350px] space-y-4 ">
            <div className="sticky top-24">
              <RecommendedUsers />
            </div>
          </aside>
        </div>
      </div>
      
      <Toaster />
    </div>
    </>
  );
};

export default MainLayout;