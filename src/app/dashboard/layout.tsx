import NavBar from "@/components/NavBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <div className="h-screen w-full ">
        <NavBar />
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
