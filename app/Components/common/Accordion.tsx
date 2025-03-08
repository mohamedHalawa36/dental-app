import type { ReactNode } from "react";
import { cn } from "~/lib/utils";
import {
  AccordionContent,
  AccordionTrigger,
  AccordionItem as UIAccordionItem,
} from "../ui/accordion";

export default function AccordionItem({
  children,
  trigger,
  className,
  value,
}: {
  children: ReactNode;
  trigger: ReactNode;
  value: string;
  className?: string;
}) {
  return (
    <UIAccordionItem value={value}>
      <AccordionTrigger className={cn("", className)}>
        {trigger}
      </AccordionTrigger>
      <AccordionContent>{children} </AccordionContent>
    </UIAccordionItem>
  );
}
