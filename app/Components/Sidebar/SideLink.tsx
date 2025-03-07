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
        "flex items-center max-sm:justify-center p-4 gap-2 transition hover:bg-slate-50 group hover:shadow-slate-200 hover:shadow-md duration-200 ",
        {
          "text-primary border-e-4 border-primary shadow bg-slate-50 ":
            isActiveLink,
        }
      )}
    >
      <Icon
        className={cn("fill-foreground", {
          "fill-primary": isActiveLink,
          "group-hover:fill-secondary": !isActiveLink,
        })}
      />
      <span
        className={cn("text-sm font-bold text-foreground max-lg:hidden", {
          "text-primary": isActiveLink,
          "group-hover:text-secondary": !isActiveLink,
        })}
      >
        {label}
      </span>
    </Link>
  );
}
