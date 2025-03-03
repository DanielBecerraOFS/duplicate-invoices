import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import "./../../../../Celonis_DummyData.json";
import { Checkbox } from "@/components/ui/checkbox";
import { DateTime } from "luxon";

import {
  InvoiceDrawerDetails,
} from "@/modules/dashboard/router";

import { Invoice } from "@/modules/dashboard/services/apiService";

const results = [
  [
    {
      reference: "INV-114",
      date: "2025-03-03T00:00:00Z",
      value: "343.30",
      vendor: "CET New York",
      pattern: "Exact Match",
      open: true,
      group_id:
        "4b9650685f17f38b83546de673cb67991103f74862355b41e0046fa138bf49ea",
      confidence: "High",
    },
  ],
  [
    {
      reference: "INV-128",
      date: "2024-05-05T00:00:00Z",
      value: "343.30",
      vendor: "Global Business Properties",
      pattern: "Exact Match",
      open: false,
      group_id:
        "e4ea486d7ab540f96d72efbc567702971ce32e560f24c857b920939c56aec62e",
      confidence: "High",
    },
    {
      reference: "INV-163",
      date: "2025-03-13T00:00:00Z",
      value: "300.00",
      vendor: "PA Electronics",
      pattern: "Exact Match",
      open: true,
      group_id:
        "2d8be040c40f31f739ef395decb535cbe8b35a5648b6ef8b3d14ceb0d40bf08a",
      confidence: "High",
    },
    {
      reference: "INV-556",
      date: "2025-03-10T00:00:00Z",
      value: "317.22",
      vendor: "Global Business Properties",
      pattern: "Similar Value",
      open: false,
      group_id:
        "b275adb85333247f69e829be66167a73c91561797fa564704e8ac27129518d18",
      confidence: "Low",
    },
    {
      reference: "INV-506",
      date: "2025-03-05T00:00:00Z",
      value: "181.18",
      vendor: "Global Business Properties",
      pattern: "Similar Value",
      open: true,
      group_id:
        "126c4629d4f631fbd5c50063c45a091b434bac1a673b5737dfa738f713742500",
      confidence: "Low",
    },
    {
      reference: "INV-326",
      date: "2024-11-22T00:00:00Z",
      value: "300.00",
      vendor: "kneifelinchen Sibylle",
      pattern: "Exact Match",
      open: true,
      group_id:
        "f75f474233e1a9aeb612606ec90b477c97f386a6238e54adfc4f952a65a3ac41",
      confidence: "High",
    },
  ],
];
interface TableLogProps {
  invoices: Invoice[];
}
const TableLog: React.FC<TableLogProps> = ({ invoices }) => {
  
  const setFormatInvoiceDate = (date) =>{    
    return  date.toLocaleString(DateTime.DATE_SHORT)
  }
  

  // Función para determinar la variante del Badge según el nivel de confianza
  const getBadgeVariant = (
    confidence: string
  ): "default" | "high" | "medium" | "low" => {
    // Convertir a minúsculas para comparación consistente
    const confidenceLevel = confidence.toLowerCase();

    // Retornar la variante adecuada según el nivel de confianza
    if (confidenceLevel === "high") {
      return "high";
    } else if (confidenceLevel === "medium") {
      return "medium";
    } else if (confidenceLevel === "low") {
      return "low";
    } else {
      return "default"; // Variante por defecto para otros casos
    }
  };
  return (
    <div className="table-container flex flex-col gap-4">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Group Code</TableHead>
            <TableHead>Invoce Code</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Pattern</TableHead>            
            <TableHead>Confidence</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Amount</TableHead>         
            <TableHead>Payment Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <InvoiceDrawerDetails
                  buttonTitle={
                    invoice.group_id.substring(0, 6) +
                    "..." +
                    invoice.group_id.slice(-6)
                  }
                  group_uuid={invoice.group_id}                />
              </TableCell>
              <TableCell>{invoice.reference}</TableCell>
              <TableCell>{invoice.Region}</TableCell>
              <TableCell>{setFormatInvoiceDate(invoice.date)}</TableCell>
              <TableCell>{invoice.pattern}</TableCell>              
              <TableCell>
                <Badge variant={getBadgeVariant(invoice.confidence)}>
                  {invoice.confidence}
                </Badge>
              </TableCell>
              <TableCell>
                {invoice.open === true ? "Open" : "Close"}
              </TableCell>
              <TableCell>{invoice.vendor}</TableCell>
              <TableCell>${parseFloat(invoice.value).toFixed(2)}</TableCell>
              
              <TableCell>{invoice.Payment_Method}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TableLog;
