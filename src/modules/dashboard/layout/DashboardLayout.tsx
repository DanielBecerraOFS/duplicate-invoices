
import { Toaster } from "@/components/ui/sonner";
import { AppBar, Dashboard } from "@/modules/dashboard/router";
import { FloatingButton } from "@/modules/sofia/router";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const DashboardLayout: React.FC = () => {
  return (
    <div className="dashboard-layout max-w-[100svw] w-full h-auto py-1 px-2 md:px-4 md:py-4 bg-surface text-on-surface">
      <div className="app-wrapper flex flex-col gap-4">
        <AppBar />
        <main className="main-content bg-surface-container-lowest px-4 py-6 rounded-xl min-h-[calc(100lvh-60px)] ">
          <TooltipProvider>
            <Dashboard />
          </TooltipProvider>
        </main>
        <FloatingButton />
        <Toaster />
      </div>
    </div>
  );
};

export default DashboardLayout;
