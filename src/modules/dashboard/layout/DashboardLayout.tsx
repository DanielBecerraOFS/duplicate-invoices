import { Component } from "react";
import { AppBar, TabsTable, KPICard } from "@/modules/dashboard/router";

export default class DashboardLayout extends Component {
  render() {
    return (
      <div className="dashboard-layout w-full h-full py-4 px-8">
        <div className="app-wrapper flex flex-col gap-4">
          <AppBar />
          <div className="kpi-grid-content">
            <div className="flex flex-row justify-between gap-2">
              <KPICard title="Duplicated Value: Open" data={140000} isCurrency={true} legend="+20.1% from last month"/>
              <KPICard title="Duplicates: Open" data={20000} isCurrency={false} legend="+20.1% from last month"/>
              <KPICard title="Duplicated Value: Valid" data={740000} isCurrency={true} legend="+20.1% from last month"/>
              <KPICard title="Duplicated: Valid" data={22000} isCurrency={false} legend="+20.1% from last month"/>
            </div>
          </div>
          <TabsTable />
        </div>
      </div>
    );
  }
}
