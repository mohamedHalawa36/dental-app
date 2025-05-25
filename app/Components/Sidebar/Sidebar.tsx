import useAuth from "~/hooks/useAuth";
import { cn, formatUserName } from "~/lib/utils";
import { getTodayInfo } from "~/utils/time";
import Calendar from "../icons/Calendar";
import Doctor from "../icons/Doctor";
import User from "../icons/User";
import { links } from "./links";
import LogoutBtn from "./LogoutBtn";
import SideLink from "./SideLink";

export default function Sidebar({ className }: { className?: string }) {
  const { dayDate, month } = getTodayInfo();
  const { userName, isDoctor } = useAuth();

  const UserIcon = isDoctor ? Doctor : User;

  return (
    <aside
      className={cn(
        "flex h-full w-[17rem] flex-col overflow-hidden bg-white py-2 shadow-xl transition-all duration-700 ease-in-out lg:rounded-s-3xl lg:duration-300",
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:px-3">
        <div className="flex flex-col items-center gap-2.5 border-gray-200">
          <img src="/images/full-logo.png" alt="Logo" className="w-4/5" />
        </div>
        <div className="flex flex-wrap items-center justify-between rounded-sm border-b border-gray-200 px-2 py-1 text-xs transition hover:bg-slate-50">
          <div className="flex items-center gap-1">
            <UserIcon />
            <h4 className="font-semibold text-foreground">
              {isDoctor && (
                <>
                  <span>د.</span>
                  &nbsp;
                </>
              )}
              {formatUserName(userName!)}
            </h4>
          </div>
          <div className="flex items-center gap-1 py-2 font-semibold text-foreground">
            <Calendar className="size-5" />
            <span className="">
              {dayDate} {month}
            </span>
          </div>
        </div>
      </div>
      <div style={{ direction: "ltr" }} className="flex-1 overflow-auto">
        <div className="flex flex-col gap-3 py-3" style={{ direction: "rtl" }}>
          {links.map((link) => (
            <SideLink key={link.href} {...link} />
          ))}
        </div>
      </div>
      <LogoutBtn />
    </aside>
  );
}
