import { Bell, BookMarked, Settings } from "lucide-react";
import { ToggleTheme } from "@/modules/core/router";
import OfiServicesDevLogo from "@/assets/ofi.svg";
import { Button } from "@/components/ui/button";
import TooltipInfoHover from "@/modules/core/components/TooltipInfoHover";

export default function AppBar() {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="navbar-brand flex flex-row gap-3 justify-start">
        <a href="#">
          <picture className="site-front-logo">
            <source src={OfiServicesDevLogo} />
            <img
              src={OfiServicesDevLogo}
              alt="Site front logo"
              width={50}
              height={50}
            />
          </picture>
        </a>
        <h1 className="text-4xl font-bold tracking-tight">
          Duplicated Invoice Checker
        </h1>
      </div>
      <div className="appbar-cta flex items-center justify-between">
        <TooltipInfoHover title="Documentation" action={null} content="">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer p-0 px-0"
          >
            <BookMarked className="cursor-pointer" />
          </Button>
        </TooltipInfoHover>
        <TooltipInfoHover title="Alerts" action={null} content="">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer p-0 px-0"
          >
            <Bell className="cursor-pointer" />
          </Button>
        </TooltipInfoHover>
        <TooltipInfoHover title="Theme" action={null} content="">
          <ToggleTheme />
        </TooltipInfoHover>
      </div>
    </div>
  );
}
