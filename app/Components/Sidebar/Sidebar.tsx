import { cn } from "~/lib/utils";
import { getTodayInfo } from "~/utils/time";
import { links } from "./links";
import LogoutBtn from "./LogoutBtn";
import SideLink from "./SideLink";

export default function Sidebar({ className }: { className?: string }) {
  const { dayName, dayDate, month, year } = getTodayInfo();

  return (
    <aside
      className={cn(
        "flex h-full w-[17rem] flex-col overflow-hidden bg-white py-2 shadow-xl transition-all duration-700 ease-in-out lg:rounded-s-3xl lg:duration-300",
        className,
      )}
    >
      <div className="flex flex-col gap-3 max-md:gap-0 sm:px-3">
        <div className="flex flex-col items-center gap-2.5 border-gray-200">
          <img src="/images/full-logo.png" alt="Logo" className="w-4/5" />
        </div>
        <div className="flex items-center justify-between rounded-sm border-b border-gray-200 transition hover:bg-slate-50 sm:px-2">
          <div className="flex w-full flex-col items-center p-2 text-sm text-foreground">
            <span className="max-sm:text-[0.65rem]">{dayName}</span>
            <span className="font-semibold lg:text-lg">
              {dayDate} {month}
            </span>
          </div>
        </div>
      </div>
      <div style={{ direction: "ltr" }} className="flex-1 overflow-auto">
        <div className="flex flex-col gap-3 py-5" style={{ direction: "rtl" }}>
          {links.map((link) => (
            <SideLink key={link.href} {...link} />
          ))}
        </div>
      </div>
      <LogoutBtn />
    </aside>
  );
}
