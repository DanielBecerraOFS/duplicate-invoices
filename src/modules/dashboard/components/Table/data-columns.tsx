"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  labels,
  confidence,
  status_inv,
} from "@/modules/dashboard/utils/data/label-data-table";
import {
  TableLabel,
  DataTableColumnHeader,
  DataTableRowActions,
  TableGroupedLabel
} from "@/modules/dashboard/router";

const getBadgeVariant = (
  confidence: string
): "default" | "high" | "medium" | "low" => {
  // Convertir a minúsculas para comparación consistente
  const confidenceLevel = confidence.toLowerCase();

  // Retornar la variante adecuada según el nivel de confianza
  if (confidenceLevel === "high") {
    return "high";
  } else if (confidenceLevel === "medium") {
    return "medium";
  } else if (confidenceLevel === "low") {
    return "low";
  } else {
    return "default"; // Variante por defecto para otros casos
  }
};

export const TableColumns: ColumnDef<TableGroupedLabel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "pattern",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pattern" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("pattern")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate">{row.getValue("region")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="font-medium">{row.getValue("date")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "confidence",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Confidence" />
    ),
    cell: ({ row }) => {
      const confidence_item = confidence.find(
        (confidence) => confidence.label === row.getValue("confidence")
      );

      if (!confidence_item) {
        return null;
      }

      return (
        <div className="flex items-center">
          <Badge variant={getBadgeVariant(confidence_item.value)} >
            {confidence_item.icon && (
              <confidence_item.icon className=" h-4 w-4 text-muted-foreground" />
            )}
            <span>{confidence_item.label}</span>
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {      
      const status_type = status_inv.find(
        (item) => item.label === String(row.original.open)
      );

      if (!status_type) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status_type.icon && (
            <status_type.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status_type.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "amount overpaid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount Overpaid" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center font-medium">
          <span> $ {row.original.amount_overpaid}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
