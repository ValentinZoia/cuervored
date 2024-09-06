import NavBar from "@/components/dashboard/NavBar/NavBar";
import { Toaster } from "@/components/ui/toaster";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <div className="h-screen w-full ">
        <NavBar />
        {children}
        <Toaster />
      </div>
    </>
  );
};

export default DashboardLayout;
