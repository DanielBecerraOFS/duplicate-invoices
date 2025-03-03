import { SetStateAction, useEffect, useState } from "react";
import {
  AppBar,
  TabsTable,
  KPICard,
  TableLogFilters,
  PaginationTable,
  SelectTableFilter,
} from "@/modules/dashboard/router";
import {
  getKPIs,
  KPI,
  Invoice,
  InvoiceFilters,
  getInvoices,
} from "@/modules/dashboard/services/apiService";
import { CircleLoader } from "react-spinners";
import { Button } from "@/components/ui/button";

const DashboardLayout: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [kpiData, setKpiData] = useState<KPI | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true); // Para la carga inicial
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false); // Para la carga durante paginación
  const [filters, setCurrentFilters] = useState({});

  // Estado local para almacenar los valores de los filtros antes de aplicarlos
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    reference: "",
    pattern: "",
    confidence: "",
    vendor: "",
    date: "",
  });

  // Estados para manejar la paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10; // Puedes ajustar este valor según tus necesidades

  // Función para manejar cambios en cada selector individual
  const handleSelectChange = (fieldName: string, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Función para aplicar todos los filtros al hacer clic en el botón
  const applyFilters = () => {
    // Filtrar solo los valores que no están vacíos
    const activeFilters = Object.entries(filterValues).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>
    );

    console.log("Aplicando filtros:", activeFilters);
    setCurrentFilters(activeFilters);
    setCurrentPage(1);
    setPaginationLoading(true);
  };

  // Función para limpiar todos los filtros
  const clearFilters = () => {
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
  };

  const handleFilterChange = (filters: SetStateAction<{}>) => {
    console.log(filters);

    setCurrentFilters(filters);
    setCurrentPage(1); // Resetear a la primera página cuando se aplican filtros
    setPaginationLoading(true); // Activar loader al cambiar filtros
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setPaginationLoading(true); // Activar loader al cambiar página
  };

  useEffect(() => {
    const initialLoad = async () => {
      setInitialLoading(true);
      try {
        // Cargar KPIs
        const kpiData = await getKPIs();
        setKpiData(kpiData);

        // Cargar primeras facturas
        const paginationParams = {
          page: 1,
          pageSize: itemsPerPage,
        };

        const response = await getInvoices(paginationParams);
        setInvoices(response.results);
        setTotalItems(response.count || 0);
        setTotalPages(
          response.totalPages || Math.ceil(response.count / itemsPerPage) || 1
        );
      } catch (error) {
        console.error("Error en carga inicial:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    initialLoad();
  }, []);

  useEffect(() => {
    if (initialLoading) return;
    fetchInvoices();
  }, [filters, currentPage, initialLoading]);

  const fetchInvoices = async (): Promise<void> => {
    setPaginationLoading(true);
    try {
      const paginationParams = {
        page: currentPage,
        pageSize: itemsPerPage,
      };

      // Combinar filtros con parámetros de paginación
      const params = { ...filters, ...paginationParams };
      console.log("Parámetros de búsqueda:", params);

      const response = await getInvoices(params);
      console.log(response.results);
      
      setInvoices(response.results);
      setTotalItems(response.count || 0);
      setTotalPages(
        response.totalPages || Math.ceil(response.count / itemsPerPage) || 1
      );
    } catch (error) {
      console.error("Error al cargar facturas:", error);
    } finally {
      setPaginationLoading(false);
    }
  };

  // Extraer valores únicos para los selectores
  const reference_list = [
    ...new Set(invoices.map((invoice) => invoice.reference)),
  ];
  const reference_pattern = [
    ...new Set(invoices.map((invoice) => invoice.pattern)),
  ];
  const reference_confidence = [
    ...new Set(invoices.map((invoice) => invoice.confidence)),
  ];
  const reference_date = [...new Set(invoices.map((invoice) => invoice.date))];
  const reference_vendor = [
    ...new Set(invoices.map((invoice) => invoice.vendor)),
  ];

  if (initialLoading)
    return (
      <div className="dashboard-layout w-full h-full py-1 px-4 md:px-8 md:py-4 flex justify-center items-center">
        <div className="app-wrapper flex flex-col gap-4">
          <AppBar />
          <div className="flex justify-center items-center">
            <CircleLoader />
          </div>
        </div>
      </div>
    );

  return (
    <div className="dashboard-layout max-w-[100vw] w-full h-full py-1 px-4 md:px-8 md:py-4">
      <div className="app-wrapper flex flex-col gap-4">
        <AppBar />
        <div className="kpi-grid-content">
          <div className="flex flex-row justify-between gap-2 flex-wrap">
            {kpiData &&
              Object.entries(kpiData).map(([key, value]) => (
                <KPICard
                  title={key}
                  data={parseFloat(value)}
                  isCurrency={key.includes("value") ? true : false}
                  legend="+20.1% from last month"
                />
              ))}
          </div>
        </div>
        <div className="filter-container mb-4">
          <div className="filter-wrapper py-1 hidden md:block">
            <h3 className="font-medium mb-4">Filters</h3>
            <div className="filter-items-grid flex flex-row gap-2">
              <SelectTableFilter
                placeholder="Por referencia"
                label="Referencia"
                options={reference_list}
                value={filterValues.reference}
                onChange={(value) => handleSelectChange("reference", value)}
              />
              <SelectTableFilter 
                placeholder="Por pattern" 
                label="Pattern" 
                options={reference_pattern}
                value={filterValues.pattern}
                onChange={(value) => handleSelectChange("pattern", value)}
              />
              <SelectTableFilter
                placeholder="Por confidence"
                label="Confidence Level"
                options={reference_confidence}
                value={filterValues.confidence}
                onChange={(value) => handleSelectChange("confidence", value)}
              />
              <SelectTableFilter 
                placeholder="Por vendor" 
                label="Vendor" 
                options={reference_vendor}
                value={filterValues.vendor}
                onChange={(value) => handleSelectChange("vendor", value)}
              />
              <SelectTableFilter 
                placeholder="Por fecha" 
                label="Fecha" 
                options={reference_date}
                value={filterValues.date}
                onChange={(value) => handleSelectChange("date", value)}
              />
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
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
