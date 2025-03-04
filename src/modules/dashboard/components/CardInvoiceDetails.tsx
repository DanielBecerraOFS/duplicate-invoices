import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag } from "lucide-react";
import formatValue from "../utils/FormatValues";

export default function CardInvoiceDetails({
  title = "Invoice Detail Title",
  value = "Invoice Detail Value",
  isCurrency = false,
  status = "default",
  icon = "",
}) {
  return (
    <Card
      className={`gap-2 py-3 ${
        status === "danger" ? "bg-red-200 text-red-950 border-red-950" : ""
      }`}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-center ">
        {icon === "high" && <Flag size={16} strokeWidth={1.5} />}
        <p>{isCurrency ? `$ ${formatValue(Number(value))}` : value}</p>
      </CardContent>
    </Card>
  );
}
