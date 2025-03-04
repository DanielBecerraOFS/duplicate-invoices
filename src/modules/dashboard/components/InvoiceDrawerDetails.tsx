"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleLoader } from "react-spinners";
import { X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  CardInvoiceDetails,
  TableDrawerDetails,
} from "@/modules/dashboard/router";
import { getInvoices, Invoice } from "@/modules/dashboard/services/apiService";


interface InvoiceDrawerProps {
  buttonTitle: string;
  group_uuid: string;
}

interface InvoiceDrawerProps {
  buttonTitle: string;
  group_uuid: string;
}

const InvoiceDrawerDetails: React.FC<InvoiceDrawerProps> = ({
  buttonTitle,
  group_uuid,
}) => {
  const [invoices, setGroupInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInvoices = async (): Promise<void> => {
    setLoading(true);
    try {
      const filters = {
        group_id: group_uuid,
      };
      const response = await getInvoices(filters);      
      setGroupInvoices(response.results);
    } catch (error) {
      console.error("Error al cargar facturas:", error);
      // Optionally add error handling (e.g., toast notification)
    } finally {
      setLoading(false);
    }
  };  

  // Render loader for card details
  const renderCardDetails = () => {
    if (loading) {
      return (
        <div className="w-full flex justify-center items-center py-4">
          <CircleLoader color="#3B82F6" />
        </div>
      );
    }

    if (!invoices || invoices.length === 0) {
      return (
        <div className="text-gray-500 text-center py-4">
          No invoice details available
        </div>
      );
    }

    return (
      <div className="invoice-details-container flex flex-row justify-start gap-2">
        <CardInvoiceDetails
          title="Confidence"
          value={invoices[0].confidence}
          status={
            invoices[0].confidence === "High" ? "danger" : "default"
          }
          icon="high"
        />
        <CardInvoiceDetails
          title="Group Value"
          value={invoices
            .reduce(
              (total, invoice) =>
                total + (Number(invoice.value) || 0),
              0
            )
            .toString()}
          isCurrency={true}
        />
        <CardInvoiceDetails
          title="Group Pattern"
          value={invoices[0].pattern}
        />
        <CardInvoiceDetails
          title="Group Contains"
          value={
            invoices[0].open === true ? "Open" : "Close"
          }
        />
      </div>
    );
  };

  // Render loader for table
  const renderTableContent = () => {
    if (loading) {
      return (
        <div className="w-full flex justify-center items-center py-4">
          <CircleLoader color="#3B82F6" />
        </div>
      );
    }

    return <TableDrawerDetails invoices_group={invoices} />;
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="text-blue-400 cursor-pointer p-0 hover:underline decoration-solid"
          onClick={fetchInvoices}
        >
          {buttonTitle}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-full w-full">
          <DrawerHeader>
            <div className="w-full flex flex-row justify-between items-center">
              <DrawerTitle className="text-3xl">Invoice Details</DrawerTitle>
              <DrawerClose asChild>
                <X className="cursor-pointer" />
              </DrawerClose>
            </div>
            <DrawerDescription>
              <div className="wrapper-description flex flex-col gap-4">
                {renderCardDetails()}
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <div className="card-body px-4 py-2">
            <div className="flex flex-col items-start justify-center space-x-2">
              <div className="buttons-cta-grid-container mb-6">
                <h2 className="title-container font-medium mb-3">
                  Validation Case
                </h2>
                <div className="flex flex-row items-center gap-2">
                  <Button variant="destructive">Duplicate</Button>
                  <Button variant="outline">No Duplicate</Button>
                  <Button variant="outline">Share Group</Button>
                  <Button variant="outline">No Action Required</Button>
                </div>
              </div>
              {renderTableContent()}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default InvoiceDrawerDetails;
