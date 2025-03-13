import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { FormatInvoiceDate, FormatValues } from "@/modules/dashboard/router";
import { Invoice } from "@/modules/dashboard/services/apiService";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
interface TableDrawerDetailsProps {
  invoices_group: Invoice[];
}

const TableDrawerDetails: React.FC<TableDrawerDetailsProps> = ({
  invoices_group,
}) => {
  return (
    <ScrollArea className="h-96 w-full">
      <Table className="drawer-details-table">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Invoce Code</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Payment date</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Special Instructions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices_group.map((invoice, index) => (
            <TableRow
              className={`${index == 0 ? "bg-primary-container text-on-primary-container" : "cursor-pointer hover:bg-surface-container-low"} `}
            >
              <TableCell>
                <Checkbox
                  className={`${index == 0 ? " border-amber-950" : ""}`}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-blue-400 cursor-pointer p-0 hover:underline decoration-solid"
                >
                  {invoice.reference}
                </Button>
              </TableCell>
              <TableCell>{invoice.region}</TableCell>
              <TableCell>{FormatInvoiceDate(invoice.date)}</TableCell>
              <TableCell>{FormatInvoiceDate(invoice.pay_date)}</TableCell>
              <TableCell>{invoice.vendor}</TableCell>
              <TableCell>{invoice.quantity}</TableCell>
              <TableCell>${FormatValues(invoice.unit_price)}</TableCell>
              <TableCell>${FormatValues(invoice.value)}</TableCell>
              <TableCell>{invoice.payment_method}</TableCell>
              <TableCell>{invoice.description}</TableCell>
              <TableCell>{invoice.special_instructions}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
    </ScrollArea>
  );
};

export default TableDrawerDetails;
