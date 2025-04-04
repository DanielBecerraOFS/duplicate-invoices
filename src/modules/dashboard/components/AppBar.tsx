import { Bell, BookMarked, ChevronDown, Menu } from "lucide-react";
import { ToggleTheme } from "@/modules/core/router";
import OFILogo from "@/assets/ofi.svg";
import HeadSOFIALogo from "@/assets/ofia-chatbot-head.png";
import ZurichLogo from "@/assets/zurich-favicon.png";
import { Button } from "@/components/ui/button";
import TooltipInfoHover from "@/modules/core/components/TooltipInfoHover";

export default function AppBar() {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="navbar-brand flex flex-row gap-3 justify-start items-center">
        <a href="#">
          <picture className="site-front-logo">
            <source src={OFILogo} />
            <img
              src={OFILogo}
              alt="Site front logo"
              className="w-8 h-8 md:w-12 md:h-12"
            />
          </picture>
        </a>
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
          Dashboard
        </h1>
      </div>
      <div className="appbar-cta flex items-center justify-between gap-4">      
        <TooltipInfoHover title="Talk with ✨SOFIA✨" action={null} content="">
          <Button
            variant="outline"
            className="cursor-pointer pr-3 pl-2 py-1 border-secondary text-on-secondary-container hover:bg-secondary-container hover:text-on-secondary-container"
          >
            <picture className="site-front-logo">
            <source src={HeadSOFIALogo} />
            <img
              src={HeadSOFIALogo}
              alt="Site front logo"
              width={25}
              height={25}
            />
          </picture>
          <p className="">Chat</p>
          </Button>
        </TooltipInfoHover>
        <TooltipInfoHover title="Documentation" action={null} content="" className="hidden md:inline-flex">
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer p-0 px-0 border-secondary text-on-secondary-container hover:bg-secondary-container hover:text-on-secondary-container"
          >
            <BookMarked className="cursor-pointer" />
          </Button>
        </TooltipInfoHover>
        <TooltipInfoHover title="Alerts" action={null} content="" className="hidden md:inline-flex">
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer p-0 px-0 border-secondary text-on-secondary-container hover:bg-secondary-container hover:text-on-secondary-container"
          >
            <Bell className="cursor-pointer" />
          </Button>
        </TooltipInfoHover>
        <TooltipInfoHover title="Theme" action={null} content="">
          <ToggleTheme />
        </TooltipInfoHover>
        <TooltipInfoHover title="Profile" action={null} content="" className="hidden md:inline-flex">
          <Button
            variant="ghost"
            className="cursor-pointer p-0 px-0 "
          >
            <picture className="site-front-logo">
            <source src="https://placehold.co/30x30" />
            <img
              src="https://placehold.co/30x30"
              alt="Site front logo"
              width={30}
              height={30}
            />
          </picture>
          <div className="profile-metadata flex flex-col items-start gap-0">
            <p className="text-s">user</p>
            <p className="text-xs ">@ofiservices.com</p>
          </div>
          <ChevronDown />
          
          </Button>
        </TooltipInfoHover>
        <TooltipInfoHover title="Menu" action={null} content="" className="md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer p-0 px-0 border-secondary text-on-secondary-container hover:bg-secondary-container hover:text-on-secondary-container"
          >
            <Menu />
          </Button>
        </TooltipInfoHover>
      </div>
    </div>
  );
}
