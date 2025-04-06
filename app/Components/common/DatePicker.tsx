"use client";

import * as React from "react";
import { format } from "date-fns";
import CalendarIcon from "~/Components/icons/Calendar";

import { cn } from "~/lib/utils";
import { Button } from "~/Components/ui/button";
import { Calendar } from "~/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/Components/ui/popover";
import type { IDatePickerProps } from "~/types/components";

export function DatePicker({
  date,
  setDate,
  className,
  label,
}: IDatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelectDate = (date: Date | undefined) => {
    setDate(date?.toLocaleDateString("en-CA"));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-col gap-1">
          {label && <span className="text-sm text-slate-500">{label}</span>}
          <Button
            variant={"outline"}
            className={cn(
              "w-64 justify-start text-left font-normal",
              !date && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>حدد تاريخ</span>}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={new Date(date)}
          onSelect={handleSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
