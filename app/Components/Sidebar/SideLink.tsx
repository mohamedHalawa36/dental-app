import type { FC } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";
import type { IconProps } from "~/types/icons";

export default function SideLink({
  Icon,
  label,
  href,
}: {
  Icon: FC<IconProps>;
  label: string;
  href: string;
}) {
  const { pathname } = useLocation();
  const isActiveLink = pathname === href;
  return (
    <Link
      to={href}
      className={cn(
        "group flex items-center gap-2 p-4 transition duration-200 hover:bg-slate-50 hover:shadow-md hover:shadow-slate-200",
        {
          "border-e-4 border-primary bg-slate-50 text-primary shadow":
            isActiveLink,
        },
      )}
    >
      <Icon
        className={cn("fill-foreground", {
          "fill-primary": isActiveLink,
          "group-hover:fill-secondary": !isActiveLink,
        })}
      />
      <span
        className={cn("text-sm font-bold text-foreground", {
          "text-primary": isActiveLink,
          "group-hover:text-secondary": !isActiveLink,
        })}
      >
        {label}
      </span>
    </Link>
  );
}
