import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import SofiaAlerts from "@/assets/sofia-alerts.png";

interface AlertDialogProps {
  description: string;
  onAction?: () => void;
}

const AlertsDialog: React.FC<AlertDialogProps> = ({
  description,
  onAction,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Open the dialog when the component mounts
    setOpen(true);
  }, []);

  const handleAction = () => {
    if (onAction) onAction();
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="flex flex-row justify-between">
        <div className="dialog-img-content">
          <picture className="sofia-alert-concept block">
            <source src={SofiaAlerts} />
            <img src={SofiaAlerts} alt="Sofia alert image concept" className=" m-auto object-contain object-center block p-0"/>
          </picture>
        </div>
        <div className="dialog-content">
          <AlertDialogHeader>
            <AlertDialogTitle>An anomaly has been detected</AlertDialogTitle>
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction className="bg-scrim text-inverse-on-surface">
              ✨ Review with SOFIA ✨
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertsDialog;
