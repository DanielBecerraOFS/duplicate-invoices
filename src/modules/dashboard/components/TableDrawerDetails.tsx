import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  FormatInvoiceDate,
  FormatValues
} from "@/modules/dashboard/router";
import { Invoice } from "@/modules/dashboard/services/apiService";
interface TableDrawerDetailsProps {
  invoices_group: Invoice[];
}

const TableDrawerDetails: React.FC<TableDrawerDetailsProps> = ({
  invoices_group,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Invoce Code</TableHead>
          <TableHead>Region</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Vendor</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Vendor</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Special Instructions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices_group.map((invoice) => (
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>{invoice.reference}</TableCell>
            <TableCell>{invoice.region}</TableCell>
            <TableCell>{FormatInvoiceDate(invoice.date)}</TableCell>
            <TableCell>{invoice.vendor}</TableCell>
            <TableCell>${FormatValues(parseFloat(invoice.value))}</TableCell>
            <TableCell>{invoice.payment_method}</TableCell>
            <TableCell>{invoice.description}</TableCell>
            <TableCell>{invoice.special_instructions}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow></TableRow>
      </TableFooter>
    </Table>
  );
};

export default TableDrawerDetails;
