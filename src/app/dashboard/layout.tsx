import MenuBar from "@/components/dashboard/NavBar/MenuBar";
import NavBar from "@/components/dashboard/NavBar/NavBar";
import { Toaster } from "@/components/ui/toaster";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <div className="h-fit w-full ">
        <NavBar />
        {children}
        <MenuBar className="sticky bottom-0 z-50 flex w-full justify-center gap-12 border-t bg-primary text-primary-foreground p-3 md:hidden" />
        <Toaster />
      </div>
    </>
  );
};

export default DashboardLayout;
