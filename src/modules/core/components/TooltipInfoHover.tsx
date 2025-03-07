import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipInfoHoverProps {
  action: string | null;
  title: string;
  content: string;
  children: React.ReactNode;
}

const TooltipInfoHover: React.FC<TooltipInfoHoverProps> = ({
  children,
  action,
  title,
  content,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className="text-center">
        <h4 className="font-bold">{title}</h4>
        <p>{content}</p>
        {action === null ? <></> : <Button>{action}</Button>}
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipInfoHover;
