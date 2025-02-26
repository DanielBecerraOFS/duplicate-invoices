import { useEffect, useState } from "react";
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
import "./../../../../Celonis_DummyData.json";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InvoiceDrawerDetails,
  PaginationTable,
  TableDrawerDetails,
  TableLogFilters,
} from "@/modules/dashboard/router";

import {CircleLoader} from "react-spinners"

import {
  getInvoices,
  Invoice,
  InvoiceFilters,
} from "@/modules/dashboard/services/apiService";

const data_details = [
  [
    {
      groupUUID:
        "dd1d3dd8183f13ece175a6510a820e74ed329955d22a1432f7dc8661e5ce0c1f",
      groupPattern: "Similar Value",
      confidence: "High",
      companyCode: "3000",
      vendor: "Acme Corportion",
      groupValue: 17281.43596,
      amountOverbooked: 8613.119279,
      groupContains: "All Open",
      earliestDueDate: "11-03-2025",
    },
  ],
  [
    {
      releatedGroup:
        "dd1d3dd8183f13ece175a6510a820e74ed329955d22a1432f7dc8661e5ce0c1f",
      docNumber: 708443,
      docType: "Standard",
      reference: 1072746,
      value: 10.0,
      currency: "$",
      vendorNumber: 1001149,
      date: "11-02-2025",
    },
    {
      releatedGroup:
        "dd1d3dd8183f13ece175a6510a820e74ed329955d22a1432f7dc8661e5ce0c1f",
      docNumber: "708443",
      docType: "Standard",
      reference: "1072746",
      value: 10.0,
      currency: "$",
      vendorNumber: "1001149",
      date: "11-02-2025",
    },
    {
      releatedGroup:
        "dd1d3dd8183f13ece175a6510a820e74ed329955d22a1432f7dc8661e5ce0c1f",
      docNumber: "708443",
      docType: "Standard",
      reference: "1072746",
      value: 10.0,
      currency: "$",
      vendorNumber: "1001149",
      date: "11-02-2025",
    },
    {
      releatedGroup:
        "dd1d3dd8183f13ece175a6510a820e74ed329955d22a1432f7dc8661e5ce0c1f",
      docNumber: "708443",
      docType: "Standard",
      reference: "1072746",
      value: 10.0,
      currency: "$",
      vendorNumber: "1001149",
      date: "11-02-2025",
    },
  ],
];
interface TableLogProps {
  filters: InvoiceFilters;
}
const TableLog: React.FC<TableLogProps> = ({ filters }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchInvoices();
  }, [filters]);

  const fetchInvoices = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await getInvoices(filters);
      console.log(data);

      setInvoices(data.results);
    } catch (error) {
      // Manejar el error adecuadamente
      console.error("Error al cargar facturas:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center"> <CircleLoader /></div>;

  return (
    <div className="table-container flex flex-col gap-4">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Group UUID</TableHead>
            <TableHead>Group Pattern</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Amount Overbooked</TableHead>
            <TableHead>Group Contains</TableHead>
            <TableHead>Earliest Due Date</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.reference}>
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
                  dataUUID={data_details}
                />
              </TableCell>
              <TableCell>{invoice.pattern}</TableCell>
              <TableCell>{invoice.reference}</TableCell>
              <TableCell>{invoice.confidence}</TableCell>
              <TableCell>{invoice.vendor}</TableCell>
              <TableCell>${parseFloat(invoice.value).toFixed(2)}</TableCell>
              <TableCell>{invoice.open === true? "All Open": "All Close"}</TableCell>
              <TableCell>{invoice.date}</TableCell>

            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
      <PaginationTable />
    </div>
  );
};

export default TableLog;
