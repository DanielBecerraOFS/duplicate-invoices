import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AssistentSheet, FormatValues } from "@/modules/dashboard/router";

interface KPICardProps {
  title:string;
  legend:string;
  isCurrency:boolean;
  data:number;
}


const KPICard: React.FC<KPICardProps> = ({
  title = "Card Title",
  legend = "space for providing additional information",
  isCurrency = true,
  data = 0,
}) => {
  return (
    <Card className="flex-1 border-primary justify-center border-1 py-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <AssistentSheet type="tooltip" initialMessage="" params={{}} />
      </CardHeader>
      <CardContent>
        <div className="text-5xl font-bold">
          {isCurrency? `$ ${FormatValues(data)}`: FormatValues(data)}
        </div>
        <p className="text-xs text-muted-foreground">{legend}</p>
      </CardContent>
    </Card>
  );
}

export default KPICard;
