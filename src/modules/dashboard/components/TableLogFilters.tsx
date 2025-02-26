// components/InvoiceFilters.tsx
import React, { useState } from "react";
import { InvoiceFilters as Filters } from "../services/apiService";
import { SelectTableFilter } from "@/modules/dashboard/router";
import { Button } from "@/components/ui/button";

interface TableLogFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

const TableLogFilters: React.FC<TableLogFiltersProps> = ({
  onFilterChange,
}) => {
  const [reference, setReference] = useState<string>("");
  const [vendor, setVendor] = useState<string>("");
  const [pattern, setPattern] = useState<string>("");
  const [openStatus, setOpenStatus] = useState<string>("");
  const [group, setGroup] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const applyFilters = (): void => {
    const filters: Filters = {};

    if (reference) filters.reference = reference;
    if (vendor) filters.vendor = vendor;
    if (pattern) filters.pattern = pattern;
    if (openStatus !== "") filters.open = openStatus === "true";
    if (group) filters.group_id = group;
    if (startDate) filters.start_date = startDate;
    if (endDate) filters.end_date = endDate;

    onFilterChange(filters);
  };

  return (
    <div className="filter-container w-full max-f-[100vw]">
      <div className="filter-wrapper py-1">
        <h3 className="font-medium">Filtros</h3>
        <div className="filter-items-grid flex flex-row gap-2">
          <SelectTableFilter placeholder="Por referencia" label="Referencia"/>
          <SelectTableFilter placeholder="Por pattern" label="Pattern"/>
          <SelectTableFilter placeholder="Por confidence" label="Confidence Level"/>
          <SelectTableFilter placeholder="Por vendor" label="Vendor"/>
          <Button variant="default" className="cursor-pointer">Aplicar</Button>
        </div>
      </div>
    </div>
  );
};

export default TableLogFilters;
