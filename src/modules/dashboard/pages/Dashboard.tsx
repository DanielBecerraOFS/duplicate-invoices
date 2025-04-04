import { z } from "zod"
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  TabsTable,
  KPICard,
  PaginationTable,
  SelectTableFilter,
  useDebounce,
  DataTablePagination, 
  DataTable, 
  TableColumns,
  FormatInvoiceDate,
  FormatValues
} from "@/modules/dashboard/router";
import { CircleLoader, SonnerToastLog } from "@/modules/core/router";
import {
  getKPIs,
  KPI,
  Invoice,
  getInvoices,
  InvoicesMetadata,
  GroupedInvoices,
  getInvoicesMetadata,
  getAgentAlerts,
  AgentAlerts,
  FlattenedInvoiceGroup,
  getGroupedInvoices,
  InvoiceResponse,
  FlattenedResponse,
} from "@/modules/dashboard/services/apiService";

import { groupedInvoiceSchema } from "@/modules/dashboard/utils/data/label-schema-table"
import tasksData from '@/modules/dashboard/utils/data/sample-task-data.json';
import { AlertsDialog } from "@/modules/sofia/router";

// Improved type definitions
type FilterKeys = "reference" | "pattern" | "confidence" | "vendor" | "date";
type FilterState = Record<FilterKeys, string>;
type LoadingState = {
  initial: boolean;
  invoices: boolean;
  metadata: boolean;
  alerts: boolean;
};

function groupedByUUID(invoices: Invoice[]): GroupedInvoices {
    const result: GroupedInvoices = {};
    invoices.forEach((invoice) => {
      const groupKey = invoice.group_id;
      if (!result[groupKey]) {
        result[groupKey] = {
          items: [],
          region: "",
          pattern: "",
          open: "",
          date: "",
          confidence: "",
          amount_overpaid: "",
          itemsCount: 0,
          group_id:"",
        };
      }
      result[groupKey].items.push(invoice);
      result[groupKey].confidence = invoice.confidence;
      result[groupKey].region = invoice.region;
      result[groupKey].open = invoice.open === true ? "Open" : "Close";
      result[groupKey].date = FormatInvoiceDate(invoice.date);
      result[groupKey].pattern = invoice.pattern;
      result[groupKey].itemsCount = result[groupKey].items.length;
      result[groupKey].pattern = invoice.pattern;
      result[groupKey].group_id = invoice.pattern;
    });
    Object.keys(result).forEach((groupKey) => {
      const group = result[groupKey];
      if (group.items.length > 1) {
        const group_total_value = group.items
          .map((item) => item.value)
          .reduce((sum, item) => sum + item, 0);
        group.amount_overpaid = FormatValues(group_total_value);
      }
    });
    return result;
  }

const Dashboard: React.FC = () => {
  // Consolidated state with more specific types
  const [groupInvoices, setGroupInvoices] = useState<FlattenedInvoiceGroup[]>([]);
  const [kpiData, setKpiData] = useState<KPI | null>(null);
  const [metadata, setInvoicesMetadata] = useState<InvoicesMetadata | null>(null);
  const [alerts, setAgentAlerts] = useState<AgentAlerts | null>(null);
  
  // Consolidated loading states
  const [loading, setLoading] = useState<LoadingState>({
    initial: true,
    invoices: false,
    metadata: false,
    alerts: false,
  });

  // Improved filter state
  const [filterValues, setFilterValues] = useState<FilterState>({
    reference: "",
    pattern: "",
    confidence: "",
    vendor: "",
    date: "",
  });
  
  // Active filters that are actually applied
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  
  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
  });

  // Debounce filter changes to prevent excessive API calls
  const debouncedFilters = useDebounce(activeFilters, 300);

  // Fetch all initial data in one useEffect
  useEffect(() => {
    const initialLoad = async () => {
      setLoading(prev => ({ ...prev, initial: true }));
      
      try {
        // Parallel data fetching for initial load
        const [kpiResponse, alertsResponse, groupInvoices, metadataResponse] = await Promise.all([
          getKPIs(),
          getAgentAlerts(),
          getGroupedInvoices(),
          getInvoicesMetadata()
        ]);

        setKpiData(kpiResponse);
        setAgentAlerts(alertsResponse);               
        setGroupInvoices(groupInvoices.results);
        setPagination(prev => ({
          ...prev,
          totalPages: Math.ceil(groupInvoices.count / pagination.itemsPerPage) || 1
        }));
        setInvoicesMetadata(metadataResponse);
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(prev => ({ ...prev, initial: false }));
      }
    };

    initialLoad();
    return () => {
      // Cancel any pending API requests if needed
    };
  }, [pagination.itemsPerPage]);

  // Centralized error handling
  const handleApiError = useCallback((error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        let title = "An error occurred";
        let description = "Please try again later";
        
        if (status === 404) {
          title = "Resource not found";
          description = "The requested information could not be found";
        } else if (status === 500) {
          title = "Server error";
          description = "There was a problem with the server";
        }
        
        toast.error(title, {
          description,
          action: {
            label: "Retry",
            onClick: () => {
              // Actually retry the failed operation instead of just logging
              if (!loading.initial) {
                refreshData();
              }
            },
          },
        });
      } else if (error.request) {
        toast.error("Network error", {
          description: "Please check your internet connection",
          action: {
            label: "Retry",
            onClick: () => {
              if (!loading.initial) {
                refreshData();
              }
            },
          },
        });
      }
    } else {
      toast.error("An unexpected error occurred", {
        description: "We're looking into this issue",
      });
    }
  }, [loading.initial]);

  useEffect(() => {
    const fetchInvoices = async () => {
      if (loading.initial) return;
      
      setLoading(prev => ({ ...prev, invoices: true }));
      
      try {
        const params = {
          ...debouncedFilters,
          page: pagination.currentPage,
        };

        const response = await getGroupedInvoices();        
        setGroupInvoices(response.results);
       
        setPagination(prev => ({
          ...prev,
          totalPages: Math.ceil(response.count / pagination.itemsPerPage) || 1
        }));
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(prev => ({ ...prev, invoices: false }));
      }
    };

    fetchInvoices();
  }, [debouncedFilters, pagination.currentPage, pagination.itemsPerPage, loading.initial, handleApiError]);

  const refreshData = useCallback(async () => {
    if (loading.initial) return;
    
    setLoading(prev => ({ 
      ...prev, 
      invoices: true,
      metadata: true,
      alerts: true 
    }));
    
    try {
      const [alertsResponse, groupInvoices, metadataResponse] = await Promise.all([
        getAgentAlerts(),
        getGroupedInvoices(),
        getInvoicesMetadata()
      ]);

      setAgentAlerts(alertsResponse);
      setGroupInvoices(groupInvoices.results);
      setPagination(prev => ({
        ...prev,
        totalPages: Math.ceil(groupInvoices.count / pagination.itemsPerPage) || 1
      }));
      setInvoicesMetadata(metadataResponse);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(prev => ({ 
        ...prev, 
        invoices: false,
        metadata: false,
        alerts: false 
      }));
    }
  }, [debouncedFilters, pagination.currentPage, pagination.itemsPerPage, loading.initial, handleApiError]);

  const handleDialogAction = () => {
    console.log('Dialog action triggered');
    // Add your action logic here
  };

  if (loading.initial) {
    return (
      <div className="dashboard-layout w-[100svw] h-[100svh] py-1 px-4 md:px-8 md:py-4 flex justify-center items-center">
        <div className="app-wrapper flex flex-col justify-center items-center gap-4 w-full h-full">
          <CircleLoader width={150} height={150}/>
          <SonnerToastLog
            type="warning"
            title="Loading recent information"
            description="Please wait until fetching recent invoices"
            actionTitle="Ok"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid-content realtive">
      {alerts && <AlertsDialog description={alerts.Alert.message}/>}
      
      <div className="kpi-grid-content">
        <div className="flex flex-row justify-between gap-2 flex-wrap">
          {kpiData &&
            Object.entries(kpiData).map(([key, value]) => (
              <KPICard
                key={key}
                title={key
                  .replace("total_similar_invoices", "Total Similar Invoices")
                  .replace(
                    "total_open_similar_invoices",
                    "Total Open Similar Invoices"
                  )
                  .replace(
                    "total_value_of_similar_invoices",
                    "Total Value of Similar Invoices"
                  )
                  .replace(
                    "total_value_of_open_similar_invoices",
                    "Total Value of Open Similar Invoices"
                  )}
                data={Number(value)}
                isCurrency={
                  key === "total_open_similar_invoices" ||
                  key === "total_value_of_similar_invoices"
                }
                legend="+20.1% from last month"
              />
            ))}
        </div>
      </div>
      <div className="relative">
        {loading.invoices && (
          <div className="absolute inset-0 bg-white/50 flex justify-center items-center z-10">
            <CircleLoader width={60} height={60} />
          </div>
        )}
      </div>
      <DataTable data={[]} groupedData={groupInvoices}  columns={TableColumns}/> 
    </div>
  );
};

export default Dashboard;