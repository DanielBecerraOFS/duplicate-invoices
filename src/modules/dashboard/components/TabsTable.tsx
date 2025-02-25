import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableLog } from "@/modules/dashboard/router";

export default function TabsTable() {
  return (
    <Tabs defaultValue="open-tab">
      <TabsList className="grid w-[400px] grid-cols-2">
        <TabsTrigger value="open-tab">Open</TabsTrigger>
        <TabsTrigger value="resolved-tab">Resolved</TabsTrigger>
      </TabsList>
      <TabsContent value="open-tab">
        <TableLog />
      </TabsContent>
      <TabsContent value="resolved-tab">
        <TableLog />
      </TabsContent>
    </Tabs>
  );
}
