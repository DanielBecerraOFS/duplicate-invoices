import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { MessageCircleQuestion } from "lucide-react"

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <MessageCircleQuestion className="cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent>
          <p>This is a tooltip to explain more close the information into the KPI</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
