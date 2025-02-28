import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SelectTableFilter, TableLog } from "@/modules/dashboard/router";
import { Invoice } from "@/modules/dashboard/services/apiService";
interface TabsTableProps {
  data_invoices: Invoice[];
}

const TabsTable: React.FC<TabsTableProps> = ({ data_invoices }) => {
  const reference_list = [...new Set(data_invoices.map((invoice) => invoice.reference))];
  const reference_pattern = [...new Set(data_invoices.map((invoice) => invoice.pattern))];
  const reference_confidence = [...new Set(data_invoices.map((invoice) => invoice.confidence))];
  const reference_date = [...new Set(data_invoices.map((invoice) => invoice.date))];

  return (
    <div className="filtering-table w-full">
      <div className="filter-container w-full max-f-[100vw] mb-4">
        <div className="filter-wrapper py-1 hidden md:block">
          <h3 className="font-medium">Filtros</h3>
          <div className="filter-items-grid flex flex-row gap-2">
            <SelectTableFilter
              placeholder="Por referencia"
              label="Referencia"
              options={reference_list}
            />
            <SelectTableFilter placeholder="Por pattern" label="Pattern" options={reference_pattern} />
            <SelectTableFilter
              placeholder="Por confidence"
              label="Confidence Level"
              options={reference_confidence}
            />
            <SelectTableFilter placeholder="Por vendor" label="Vendor" options={reference_date} />
            <Button variant="default" className="cursor-pointer">
              Aplicar
            </Button>
          </div>
        </div>
      </div>
      <Tabs defaultValue="open-tab">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="open-tab">Open</TabsTrigger>
          <TabsTrigger value="resolved-tab">Resolved</TabsTrigger>
        </TabsList>
        <TabsContent value="open-tab">
          <TableLog invoices={data_invoices} />
        </TabsContent>
        <TabsContent value="resolved-tab">
          <TableLog invoices={data_invoices} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsTable;
