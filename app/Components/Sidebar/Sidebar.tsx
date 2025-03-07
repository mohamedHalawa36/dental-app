import { useState } from "react";
import { cn } from "~/lib/utils";
import { getTodayInfo } from "~/utils/time";
import ArrowLeft from "../icons/ArrowLeft";
import DoubleArrow from "../icons/DoubleArrow";
import { links } from "./links";
import SideLink from "./SideLink";

export default function Sidebar() {
  // const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { dayName, dayDate, month, year } = getTodayInfo();
  return (
    <div className="flex items-center gap-1 relative">
      <aside
        className={cn(
          " drop-shadow-xl shadow-stone-300 bg-white py-2 flex flex-col transition-all duration-200 lg:duration-500 h-full max-lg:w-[4.5rem] w-72 overflow-hidden",
          { "max-lg:w-0 w-0": isCollapsed }
        )}
      >
        <div className="flex flex-col sm:px-3 gap-3 max-md:gap-0">
          <div className="flex flex-col gap-2.5 items-center border-gray-200 ">
            <img
              src="/images/full-logo.png"
              alt="Logo"
              className="w-4/5 max-lg:hidden"
            />
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-3/5 lg:hidden"
            />
          </div>
          <button
            onClick={() => setIsCollapsed(true)}
            className="flex hover:bg-slate-50 rounded-sm items-center sm:px-2 justify-between transition border-b border-gray-200 "
          >
            <div className="flex flex-col w-full px-1 items-center py-5 text-foreground text-sm">
              <span className="max-sm:text-[0.65rem]">{dayName}</span>
              <span className="lg:text-lg font-semibold">
                {dayDate} {month}
              </span>
              <span className="max-sm:text-xs">{year}</span>
            </div>
            <ArrowLeft className="max-sm:hidden rotate-180" />
          </button>
        </div>
        <div style={{ direction: "ltr" }} className="overflow-auto">
          <div
            className="flex flex-col gap-3 py-5 "
            style={{ direction: "rtl" }}
          >
            {links.map((link) => (
              <SideLink key={link.href} {...link} />
            ))}
          </div>
        </div>
      </aside>
      <button
        className={cn(
          "bg-white transition-all opacity-70 group h-32 rounded absolute top-1/2 -translate-y-1/2 left-0 -translate-x-full -me-2 px-0.5 drop-shadow-md z-50",
          {
            "sm:hidden": !isCollapsed,
            "rotate-180 [&>path]:stroke-primary": isCollapsed,
          }
        )}
        onClick={() => setIsCollapsed((flag) => !flag)}
      >
        <span className={cn("", {})}>
          <DoubleArrow
            className={cn(
              "lg:group-hover:[&>path]:stroke-primary transition-all duration-1000 animate-fade-left repeat-infinite",
              {
                "[&>path]:stroke-primary": isCollapsed,
              }
            )}
          />
        </span>
      </button>
    </div>
  );
}
