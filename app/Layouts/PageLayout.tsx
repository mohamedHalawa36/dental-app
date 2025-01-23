import type { ReactNode } from "react";
import { useLocation } from "react-router";
import Input from "~/Components/common/Input";
import PageLoader from "~/Components/common/PageLoader";
import Search from "~/Components/icons/Search";
import { links } from "~/Components/Sidebar/links";

export default function PageLayout({
  children,
  isFetching,
}: {
  children: ReactNode;
  isFetching?: boolean;
}) {
  const { pathname } = useLocation();

  const pageTitle = links.find((link) => link.href === pathname)?.label;

  return (
    <div className="flex flex-col gap-5 sm:gap-9 py-5 sm:py-8 px-3 sm:px-5 w-full h-full">
      <div className="flex sm:items-center max-lg:gap-5 justify-between max-lg:flex-col">
        <h4 className="font-semibold text-3xl sm:text-4xl text-foreground">
          {pageTitle}
        </h4>
        <Input icon={<Search />} className="sm:w-80 w-full" placeholder="بحث" />
      </div>
      <div className=" overflow-auto flex-1 pe-1">
        {isFetching ? <PageLoader /> : children}
      </div>
    </div>
  );
}
