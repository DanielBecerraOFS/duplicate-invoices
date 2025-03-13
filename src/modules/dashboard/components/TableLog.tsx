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
import { Checkbox } from "@/components/ui/checkbox";

import {
  InvoiceDrawerDetails,
  FormatInvoiceDate,
  FormatValues,
} from "@/modules/dashboard/router";

import { Invoice } from "@/modules/dashboard/services/apiService";
import { TolltipInfoHover } from "@/modules/core/router";

interface TableLogProps {
  invoices: Invoice[];
}

interface GroupedInvoices {
  [key: string]: {
    items: Invoice[];
    totalValue: number;
  };
}

const TableLog: React.FC<TableLogProps> = ({ invoices }) => {
  function groupedByUUID(invoices: Invoice[]): GroupedInvoices {
    const result: GroupedInvoices = {};

    // Agrupar los elementos por grouped_uuid
    invoices.forEach((invoice) => {
      const groupKey = invoice.group_id;

      // Si el grupo no existe, lo inicializamos
      if (!result[groupKey]) {
        result[groupKey] = {
          items: [],
          totalValue: 0,
        };
      }

      // Añadimos el elemento al grupo
      result[groupKey].items.push(invoice);
    });
    Object.keys(result).forEach((groupKey) => {
      const group = result[groupKey];
      if (group.items.length > 1) {
        const group_total_value = group.items
          .map((item) => item.value)
          .reduce((sum, item) => sum + item, 0);
        group.totalValue = group_total_value;
      }
    });
    return result;
  }

  const grouped_invoices = groupedByUUID(invoices);

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
        <TableCaption>
          {Object.keys(grouped_invoices).length < 1
            ? "No data available to display"
            : `${Object.keys(grouped_invoices).length} available data found`}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Pattern</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount Overpaid</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(grouped_invoices).map((groupKey) =>
            grouped_invoices[groupKey].items.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <InvoiceDrawerDetails
                    buttonTitle={invoice.pattern}
                    group_uuid={invoice.group_id}
                    type="link"
                  />
                </TableCell>
                <TableCell>{invoice.region}</TableCell>
                <TableCell>{FormatInvoiceDate(invoice.date)}</TableCell>
                <TableCell>
                  <TolltipInfoHover
                    action={null}
                    content="Accurrancy Level"
                    title={invoice.accuracy.toLocaleString()}
                  >
                    <Badge
                      variant={getBadgeVariant(invoice.confidence)}
                      className="cursor-pointer"
                    >
                      {invoice.confidence}
                    </Badge>
                  </TolltipInfoHover>
                </TableCell>
                <TableCell>
                  {invoice.open === true ? "Open" : "Close"}
                </TableCell>
                <TableCell>
                  $ {FormatValues(grouped_invoices[groupKey].totalValue)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TableLog;
