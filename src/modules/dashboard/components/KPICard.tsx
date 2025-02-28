import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TooltipInfoIcon } from "@/modules/core/router";
import { FormatValues } from "@/modules/dashboard/router";

export default function KPICard({
  title = "Card Title",
  legend = "space for providing additional information",
  isCurrency = true,
  data = 0,
}) {
  return (
    <Card className="flex-1 border-amber-300 border-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <TooltipInfoIcon />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">
          {isCurrency? `$ ${FormatValues(data)}`: FormatValues(data)}
        </div>
        <p className="text-xs text-muted-foreground">{legend}</p>
      </CardContent>
    </Card>
  );
}
