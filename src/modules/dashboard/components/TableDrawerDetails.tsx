"use client";

import * as React from "react";
import { Minus, Plus, X } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export default function TableDrawerDetails({
  buttonTitle = "Group UUID",
  dataUUID = [],
}) {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (    
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="text-blue-400 cursor-pointer">
          {buttonTitle}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-full w-full max-w-sm">
          <div className="icon-close-container absolute top-3 right-3 cursor-pointer">
            <DrawerClose asChild>
              <X />
            </DrawerClose>
          </div>
          <DrawerHeader>
            <DrawerTitle>{dataUUID[0][0].groupUUID}</DrawerTitle>
            <DrawerDescription>
                <div className="flex flex-row items-center justify-start gap-2">
                    <div className="bg-red-800 text-red-200 py-1 px-2 rounded-md">
                        {dataUUID[0][0].confidence}
                    </div>
                    <div className="bg-zinc-300 text-zinc-950 py-1 px-2 rounded-md">
                        {dataUUID[0][0].groupValue}
                    </div>
                </div>
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={goal <= 300}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: "hsl(var(--foreground))",
                        opacity: 0.9,
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
