import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableLog } from "@/modules/dashboard/router";
import { Invoice } from "@/modules/dashboard/services/apiService";
interface TabsTableProps {
  data_invoices: Invoice[]
}

const TabsTable: React.FC<TabsTableProps> = ({ data_invoices }) => {
  return (
    <div className="filtering-table w-full">
      <Tabs defaultValue="open-tab">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="open-tab">Open</TabsTrigger>
          <TabsTrigger value="resolved-tab">Resolved</TabsTrigger>
        </TabsList>
        <TabsContent value="open-tab">
          <TableLog invoices={data_invoices}/>
        </TabsContent>
        <TabsContent value="resolved-tab">
          <TableLog invoices={data_invoices} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsTable;
