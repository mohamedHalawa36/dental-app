import { useContext, type ReactNode } from "react";
import { useLocation } from "react-router";
import Input from "~/Components/common/Input";
import PageLoader from "~/Components/common/PageLoader";
import Sheet from "~/Components/common/Sheet";
import BurgerMenu from "~/Components/icons/BurgerMenu";
import Search from "~/Components/icons/Search";
import { links } from "~/Components/Sidebar/links";
import Sidebar from "~/Components/Sidebar/Sidebar";
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
    <div className="flex flex-col sm:gap-3 py-2 sm:py-6 px-2 sm:px-5 w-full h-full">
      <div className="flex sm:items-center max-lg:gap-3 justify-between max-lg:flex-col">
        <div className="flex justify-between items-center p-1 max-lg:w-full">
          <div className="flex gap-3">
            <h4 className="font-semibold text-2xl sm:text-3xl text-foreground">
              {pageTitle}
            </h4>

            {!!addBtn && addBtn}
          </div>
          <div className="lg:hidden">
            <Sheet trigger={<BurgerMenu className=" size-7" />} title="">
              <Sidebar className="w-full h-full" />
            </Sheet>
          </div>
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
        <Toaster
          richColors={true}
          position="top-left"
          theme="light"
          closeButton
        />

        {isFetching ? <PageLoader /> : children}
      </div>
    </div>
  );
}
