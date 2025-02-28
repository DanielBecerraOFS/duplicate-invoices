"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {CardInvoiceDetails, TableDrawerDetails} from "@/modules/dashboard/router";
import { X } from "lucide-react";


export default function InvoiceDrawerDetails({
  buttonTitle = "Group UUID",
  dataUUID = [],
}) {
  return (   
    console.log(dataUUID),
         
    <Drawer>  
      <DrawerTrigger asChild>
        <Button variant="ghost" className="text-blue-400 cursor-pointer">
          {buttonTitle}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-full w-full">
          <DrawerHeader>
            <div className="w-full flex flex-row justify-between items-center">
              <DrawerTitle className="text-3xl">Invoice Details</DrawerTitle>
              <DrawerClose asChild>
                <X className="cursor-pointer"/>
              </DrawerClose>
            </div>
            <DrawerDescription>
              <div className="wrapper-description flex flex-col gap-4">
                <div className="invoice-details-container flex flex-row justify-start gap-2">
                  <CardInvoiceDetails
                    title="Group UUID"
                    value={dataUUID[0][0].group_id}
                  ></CardInvoiceDetails>
                  <CardInvoiceDetails
                    title="Confidence"
                    value={dataUUID[0][0].confidence}
                    status={
                      dataUUID[0][0].confidence === "High"
                        ? "danger"
                        : "default"
                    }
                    icon="high"
                  ></CardInvoiceDetails>
                  <CardInvoiceDetails
                    title="Group Value"
                    value="40.00/$"
                    isCurrency={true}
                  ></CardInvoiceDetails>
                  <CardInvoiceDetails
                    title="Group Pattern"
                    value={dataUUID[0][0].pattern}
                  ></CardInvoiceDetails>
                  <CardInvoiceDetails
                    title="Group Contains"
                    value={dataUUID[0][0].open === true ? "All Open" : "All Close"}
                  ></CardInvoiceDetails>
                </div>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <div className="card-body px-4 py-2">
            <div className="flex flex-col items-start justify-center space-x-2">
              <div className="buttons-cta-grid-container mb-6">
                <h2 className="title-container font-medium mb-3">Validation Case</h2>
                <div className="flex flex-row items-center gap-2">
                  <Button variant="destructive">Duplicate</Button>
                  <Button variant="outline">No Duplicate</Button>
                  <Button variant="outline">Share Group</Button>
                  <Button variant="outline">No Action Required</Button>
                </div>
              </div>
              <TableDrawerDetails dataGroup={dataUUID[1]}/>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
