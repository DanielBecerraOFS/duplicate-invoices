import { Bookmark, Settings } from "lucide-react";
import { ToggleTheme } from "@/modules/core/router";

export default function AppBar() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <h1 className="text-4xl font-bold tracking-tight">
        Duplicated Invoice Checker
      </h1>
      <div className="appbar-cta flex items-center justify-between gap-2">
        <Bookmark className="cursor-pointer"/>
        <ToggleTheme/>
        <Settings className="cursor-pointer"/>
      </div>
    </div>
  );
}
