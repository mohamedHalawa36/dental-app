import { cn } from "~/lib/utils";
import { getTodayInfo } from "~/utils/time";
import ArrowLeft from "../icons/ArrowLeft";
import { links } from "./links";
import SideLink from "./SideLink";

export default function Sidebar({ className }: { className?: string }) {
  const { dayName, dayDate, month, year } = getTodayInfo();

  return (
    <aside
      className={cn(
        " drop-shadow-xl shadow-stone-300 bg-white py-2 flex flex-col transition-all ease-in-out duration-700 lg:duration-300 h-full w-[17rem] overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col sm:px-3 gap-3 max-md:gap-0">
        <div className="flex flex-col gap-2.5 items-center border-gray-200 ">
          <img src="/images/full-logo.png" alt="Logo" className="w-4/5" />
          {/* <img src="/images/logo.png" alt="Logo" className="w-3/5 lg:hidden" /> */}
        </div>
        <button className="flex hover:bg-slate-50 rounded-sm items-center sm:px-2 justify-between transition border-b border-gray-200 ">
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
        <div className="flex flex-col gap-3 py-5 " style={{ direction: "rtl" }}>
          {links.map((link) => (
            <SideLink key={link.href} {...link} />
          ))}
        </div>
      </div>
    </aside>
  );
}
