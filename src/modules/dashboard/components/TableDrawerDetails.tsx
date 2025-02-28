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
export default function TableDrawerDetails({ dataGroup = [] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox />
          </TableHead>
          <TableHead>Related Group</TableHead>
{/*           <TableHead>Number</TableHead>
          <TableHead>Type</TableHead> */}
          <TableHead>Reference</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Vendor</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataGroup.map((invoice) => (
          <TableRow key={invoice.group_id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell className="text-blue-400 cursor-pointer">{invoice.group_id}</TableCell>
{/*             <TableCell>{invoice.docNumber}</TableCell>
            <TableCell>{invoice.docType}</TableCell> */}
            <TableCell>{invoice.reference}</TableCell>
            <TableCell>$ {invoice.value}</TableCell>
            <TableCell>{invoice.vendor}</TableCell>
            <TableCell>{invoice.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow></TableRow>
      </TableFooter>
    </Table>
  );
}
