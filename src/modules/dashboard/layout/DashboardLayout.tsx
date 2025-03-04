import { Toaster } from "@/components/ui/sonner";
import {
  AppBar,
  Dashboard,
} from "@/modules/dashboard/router";


const DashboardLayout: React.FC = () => {
  return (
    <div className="dashboard-layout max-w-[100vw] w-full h-full py-1 px-4 md:px-8 md:py-4">
      <div className="app-wrapper flex flex-col gap-4">
        <AppBar />
        <main className="main-content">
          <Dashboard/>
        </main>
        <Toaster />
      </div>
    </div>
  );
};

export default DashboardLayout;
