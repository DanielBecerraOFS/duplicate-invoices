import { SetStateAction, useEffect, useState } from "react";
import {
  AppBar,
  TabsTable,
  KPICard,
  TableLogFilters,
} from "@/modules/dashboard/router";
import {
  getKPIs,
  KPI,
  Invoice,
  InvoiceFilters,
  getInvoices,
} from "@/modules/dashboard/services/apiService";
import { CircleLoader } from "react-spinners";

const DashboardLayout: React.FC =  () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [kpiData, setKpiData] = useState<KPI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setCurrentFilters] = useState({});

  const handleFilterChange = (filters: SetStateAction<{}>) => {
    setCurrentFilters(filters);
  };

  useEffect(() => {
    const fetchKPIs = async (): Promise<void> => {
      setLoading(true);
      try {
        const data = await getKPIs();
        setKpiData(data);
      } catch (error) {
        console.error("Error al cargar KPIs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKPIs();
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [filters]);

  const fetchInvoices = async (): Promise<void> => {
    setLoading(true);
    try {
      const invoices = await getInvoices(filters);                 
      setInvoices(invoices.results);
    } catch (error) {
      console.error("Error al cargar facturas:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="dashboard-layout w-full h-full py-1 px-4 md:px-8 md:py-4">
        <div className="app-wrapper flex flex-col gap-4">
          <AppBar />
          <div className="flex justify-center items-center">
            {" "}
            <CircleLoader />
          </div>
        </div>
      </div>
    );

  return (   
    <div className="dashboard-layout w-full h-full py-1 px-4 md:px-8 md:py-4">
      <div className="app-wrapper flex flex-col gap-4">
        <AppBar />
        <div className="kpi-grid-content">
          <div className="flex flex-row justify-between gap-2 flex-wrap">
            {kpiData &&
              Object.entries(kpiData).map(([key, value]) => (
                <KPICard
                  title={key}
                  data={value}
                  isCurrency={key.includes("value") ? true : false}
                  legend="+20.1% from last month"
                />
              ))}
          </div>
        </div>
        <div className="filters-grid-contianer">
          <TableLogFilters onFilterChange={handleFilterChange} />
        </div>
        <TabsTable invoices={invoices} />
      </div>
    </div>
  );
};

export default DashboardLayout;
