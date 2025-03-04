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

import {
  InvoiceDrawerDetails,
  FormatInvoiceDate
} from "@/modules/dashboard/router";

import { Invoice } from "@/modules/dashboard/services/apiService";


interface TableLogProps {
  invoices: Invoice[];
}
const TableLog: React.FC<TableLogProps> = ({ invoices }) => {

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
        <TableCaption>{
              invoices.length == 0 ? "No data available to display": `${invoices.length} available data found`
            }</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Pattern</TableHead> 
            <TableHead>Invoce Code</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Date</TableHead>
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
                  buttonTitle={invoice.pattern
                    /* invoice.group_id.substring(0, 6) +
                    "..." +
                    invoice.group_id.slice(-6) */
                  }
                  group_uuid={invoice.group_id}                />
              </TableCell>
              <TableCell>{invoice.reference}</TableCell>
              <TableCell>{invoice.region}</TableCell>
              <TableCell>{FormatInvoiceDate(invoice.date)}</TableCell>            
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
              
              <TableCell>{invoice.payment_method}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TableLog;
