import { useEffect, useState, useCallback, useMemo } from "react";
import { CircleLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import {
  TabsTable,
  KPICard,
  PaginationTable,
  SelectTableFilter,
  RecommendsCarrousel,
} from "@/modules/dashboard/router";
import {
  getKPIs,
  KPI,
  Invoice,
  getInvoices,
  InvoicesMetadata,
  getInvoicesMetadata,
  getAgentAlerts,
  AgentAlerts,
} from "@/modules/dashboard/services/apiService";
import { SonnerToastLog } from "@/modules/core/router";
import axios from "axios";
import { toast } from "sonner";

// Define filter keys type for better type safety
type FilterKeys = "reference" | "pattern" | "confidence" | "vendor" | "date";

const Dashboard: React.FC = () => {
  // Initial state with type safety
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [kpiData, setKpiData] = useState<KPI | null>(null);
  const [metadata, setInvoicesMetadata] = useState<InvoicesMetadata>();
  const [alerts, setAgentAlerts] = useState<AgentAlerts>();
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const [filters, setCurrentFilters] = useState<Record<string, string>>({});

  // Improved filter values initialization
  const [filterValues, setFilterValues] = useState<Record<FilterKeys, string>>({
    reference: "",
    pattern: "",
    confidence: "",
    vendor: "",
    date: "",
  });

  // Pagination state with improved typing
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;

  // Memoized unique filter options to prevent unnecessary re-renders
  const filterOptions = useMemo(
    () => ({
      reference: [...new Set(invoices.map((invoice) => invoice.reference))],
      pattern: [...new Set(invoices.map((invoice) => invoice.pattern))],
      confidence: ["High", "Medium", "Low"],
      date: [...new Set(invoices.map((invoice) => invoice.date))],
      vendor: [...new Set(invoices.map((invoice) => invoice.vendor))],
    }),
    [invoices]
  );

  // Improved select change handler with type safety
  const handleSelectChange = useCallback(
    (fieldName: FilterKeys, value: string) => {
      setFilterValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    },
    []
  );

  // Optimized filter application logic
  const applyFilters = useCallback(() => {
    const activeFilters = Object.entries(filterValues).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>
    );

    // Reset to first page and trigger loading only if filters changed
    setCurrentFilters(activeFilters);
    setCurrentPage(1);
    setPaginationLoading(true);
  }, [filterValues]);

  // Clear all filters with a single function
  const clearFilters = useCallback(() => {
    setFilterValues({
      reference: "",
      pattern: "",
      confidence: "",
      vendor: "",
      date: "",
    });
    setCurrentFilters({});
    setCurrentPage(1);
    setPaginationLoading(true);
  }, []);

  // Memoized fetch invoices function to prevent unnecessary re-renders
  const fetchInvoices = useCallback(async (): Promise<void> => {
    if (initialLoading) return;

    setPaginationLoading(true);
    try {
      const params = {
        ...filters,
        page: currentPage,
      };

      const response = await getInvoices(params);
      setInvoices(response.results);
      setTotalPages(Math.ceil(response.count / itemsPerPage) || 1);
    } catch (error) {
      console.error("Error al cargar facturas:", error);
    } finally {
      setPaginationLoading(false);
    }
  }, [currentPage, filters, initialLoading, itemsPerPage]);

  const fetchInvoicesMetadata = useCallback(async (): Promise<void> => {
    if (initialLoading) return;

    setPaginationLoading(true);
    try {
      const filters = await getInvoicesMetadata();
      setInvoicesMetadata(filters);
    } catch (error) {
      console.error("Error al cargar facturas:", error);
    } finally {
      setPaginationLoading(false);
    }
  }, []);

  const fetchAgentAlerts = useCallback(async (): Promise<void> => {
    if (initialLoading) return;
    try {
      const alerts = await getAgentAlerts();
      setAgentAlerts(alerts);
    } catch (error) {
      console.error("Error al cargar facturas:", error);
    } finally {
      setPaginationLoading(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    const initialLoad = async () => {
      setInitialLoading(true);
      try {
        const kpiData = await getKPIs();
        setKpiData(kpiData);

        const alerts = await getAgentAlerts();
        console.log(alerts);
        setAgentAlerts(alerts);

        const response = await getInvoices({
          page: 1,
        });
        setInvoices(response.results);
        setTotalPages(Math.ceil(response.count / itemsPerPage) || 1);

        const filters = await getInvoicesMetadata();
        setInvoicesMetadata(filters);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            switch (error.response.status) {
              case 404:
                toast.error("An Error found trying to retrieve information", {
                  description:
                    "It's look like a problem with the GET Protocol ",
                  action: {
                    label: "Try again",
                    onClick: () => console.log("Undo"),
                  },
                });
                break;
              case 500:
                toast.error("An Error found with the server", {
                  description:
                    "It's look like a problem about server communication",
                  action: {
                    label: "Try again",
                    onClick: () => console.log("Undo"),
                  },
                });
                break;
              default:
                toast.error("An Error found to load information", {
                  description: "It's look like a runtime problem",
                  action: {
                    label: "Try again",
                    onClick: () => console.log("Undo"),
                  },
                });
            }
          } else if (error.request) {
            toast.error("An Error found with yout internet conection", {
              description: "Check your WiFi conection",
              action: {
                label: "Try again",
                onClick: () => console.log("Undo"),
              },
            });
          } else {
            toast.error("An Error found with the request", {
              description:
                "We are collecting error information. Please try again later",
              action: {
                label: "Ok",
                onClick: () => console.log("Undo"),
              },
            });
          }
        }
      } finally {
        setInitialLoading(false);
      }
    };

    initialLoad();
  }, []);

  // Trigger invoice fetch when filters or page changes
  useEffect(() => {
    // Only fetch if not in initial loading state
    if (!initialLoading) {
      fetchInvoices();
    }
  }, [
    filters,
    currentPage,
    fetchInvoices,
    initialLoading,
    metadata,
    fetchInvoicesMetadata,
  ]);
  useEffect(() => {
    if (!initialLoading) {
      fetchInvoicesMetadata();
    }
  }, [filters, fetchInvoicesMetadata, initialLoading]);

  useEffect(() => {
    if (!initialLoading) {
      fetchAgentAlerts();
    }
  }, [alerts, fetchAgentAlerts, initialLoading]);

  // Loading state
  if (initialLoading)
    return (
      <div className="dashboard-layout w-[100vw] h-full py-1 px-4 md:px-8 md:py-4 flex justify-center items-center">
        <div className="app-wrapper flex flex-col justify-center items-center gap-4">
          <CircleLoader />
          <SonnerToastLog
            type="warning"
            title="Loading recent information"
            description="Please wait until fetching recent invoices"
            actionTitle="Ok"
          />
        </div>
      </div>
    );
  return (
    <div className="grid-content">
      <div className="recommends-on-start-container my-3">
        {alerts && <RecommendsCarrousel alerts={alerts} />}
      </div>
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
                  key == "total_open_similar_invoices" ||
                  key == "total_value_of_similar_invoices"
                    ? true
                    : false
                }
                legend="+20.1% from last month"
              />
            ))}
        </div>
      </div>
      <div className="filter-container mb-4">
        <div className="filter-wrapper py-1 hidden md:block">
          <h3 className="font-medium mb-4">Filters</h3>
          <div className="filter-items-grid flex flex-row gap-2">
            {metadata && (
              <div className="flex flex-row gap-2">
                <SelectTableFilter
                  placeholder="By Reference"
                  label="Reference"
                  options={metadata.reference_values}
                  value={filterValues.reference}
                  onChange={(value) => handleSelectChange("reference", value)}
                />
                <SelectTableFilter
                  placeholder="BY Pattern"
                  label="Pattern"
                  options={metadata.pattern_values}
                  value={filterValues.pattern}
                  onChange={(value) => handleSelectChange("pattern", value)}
                />
                <SelectTableFilter
                  placeholder="By Confidence"
                  label="Confidence Level"
                  options={filterOptions.confidence}
                  value={filterValues.confidence}
                  onChange={(value) => handleSelectChange("confidence", value)}
                />
                <SelectTableFilter
                  placeholder="By Vendor"
                  label="Vendor Name"
                  options={metadata.vendor_values}
                  value={filterValues.vendor}
                  onChange={(value) => handleSelectChange("vendor", value)}
                />
                <SelectTableFilter
                  placeholder="By Date"
                  label="Dates"
                  options={metadata.date_values}
                  value={filterValues.date}
                  onChange={(value) => handleSelectChange("date", value)}
                />
              </div>
            )}
            <div className="flex gap-2">
              <Button
                variant="default"
                className="cursor-pointer"
                onClick={applyFilters}
              >
                Aplicar
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={clearFilters}
              >
                Limpiar
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        {paginationLoading && (
          <div className="absolute inset-0 bg-white/50 flex justify-center items-center z-10">
            <CircleLoader />
          </div>
        )}
        <TabsTable data_invoices={invoices} />
      </div>
      <PaginationTable
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          setPaginationLoading(true);
        }}
      />
    </div>
  );
};

export default Dashboard;
