import { Settings } from "lucide-react";
import { ToggleTheme } from "@/modules/core/router";
import OfiServicesDevLogo from "@/assets/ofi.svg";

export default function AppBar() {
  return (
    <div className="flex items-center justify-between">
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
      <div className="appbar-cta flex items-center justify-between gap-2">
        <ToggleTheme />
        <Settings className="cursor-pointer" />
      </div>
    </div>
  );
}
