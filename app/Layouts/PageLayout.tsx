import { useContext, type ReactNode } from "react";
import { useLocation } from "react-router";
import Input from "~/Components/common/Input";
import PageLoader from "~/Components/common/PageLoader";
import Search from "~/Components/icons/Search";
import { links } from "~/Components/Sidebar/links";
import { Toaster } from "~/Components/ui/sonner";
import { SearchContext } from "~/Contexts/SearchContext";

export default function PageLayout({
  children,
  isFetching,
  addBtn,
}: {
  children: ReactNode;
  isFetching?: boolean;
  addBtn?: ReactNode;
}) {
  const { pathname } = useLocation();
  const { search, setSearch } = useContext(SearchContext);

  const pageTitle = links.find((link) => link.href === pathname)?.label;

  return (
    <div className="flex flex-col gap-3 sm:gap-7 py-2 sm:py-8 px-2 sm:px-5 w-full h-full">
      <div className="flex sm:items-center max-lg:gap-3 justify-between max-lg:flex-col">
        <div className="flex items-center gap-3">
          <h4 className="font-semibold text-2xl sm:text-4xl text-foreground">
            {pageTitle}
          </h4>

          {!!addBtn && addBtn}
        </div>
        <Input
          icon={<Search />}
          className="sm:w-80 w-full text-sm max-sm:[&>div>input]:placeholder:text-sm max-sm:[&>div>input]:text-sm"
          placeholder="بحث"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
          }}
        />
      </div>
      <div className=" overflow-auto flex-1 pe-1">
        <Toaster richColors={true} position="top-left" theme="light" />

        {isFetching ? <PageLoader /> : children}
      </div>
    </div>
  );
}
