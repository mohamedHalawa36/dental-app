import { useState, type ReactNode } from "react";
import { useLocation } from "react-router";
import Input from "~/Components/common/Input";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import Sheet from "~/Components/common/Sheet";
import Search from "~/Components/icons/Search";
import { links } from "~/Components/Sidebar/links";
import Sidebar from "~/Components/Sidebar/Sidebar";
import { Toaster } from "~/Components/ui/sonner";
import SearchProvider from "~/Contexts/SearchContext";
import AuthGuard from "~/Guards/AuthGuard";

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
  const [search, setSearch] = useState("");

  const activeLink = links.find((link) => link.href === pathname);
  const pageTitle =
    activeLink?.id === "home" ? "مواعيد اليوم" : activeLink?.label;

  return (
    <AuthGuard>
      <SearchProvider value={{ search, setSearch }}>
        <div className="h-full w-full flex flex-col lg:p-4">
          <div className=" flex h-full">
            <div className="max-lg:hidden ">
              <Sidebar />
            </div>
            <main className=" bg-gradient-to-b to-fuchsia-200/30 from-cyan-200/30 to-70% flex-1 max-h-full rounded-e-2xl shadow-xl">
              <div className="flex flex-col sm:py-6 sm:px-5 w-full h-full">
                <div className="flex sm:items-start max-sm:gap-2.5 justify-between max-sm:flex-col max-sm:bg-gradient-to-l from-primary from-20% to-secondary max-sm:pt-3 max-sm:pb-1 max-sm:px-2 max-sm:rounded-b-[2rem]">
                  <div className="flex gap-2 ">
                    <div className="lg:hidden">
                      <Sheet
                        trigger={
                          <img
                            src="/images/logo.png"
                            alt="logo"
                            className=" h-9 drop-shadow-2xl"
                          />
                        }
                        title=""
                      >
                        <Sidebar className="w-full h-full max-sm:rounded-e-2xl" />
                      </Sheet>
                    </div>
                    <div className="flex gap-3 max-sm:flex-1 relative">
                      <h4 className="font-semibold text-2xl sm:text-3xl max-sm:text-zinc-100">
                        {pageTitle}
                      </h4>

                      {!!addBtn && addBtn}
                    </div>
                  </div>
                  <Input
                    icon={<Search />}
                    className="sm:w-80 text-sm max-sm:[&>div>input]:placeholder:text-sm max-sm:[&>div>input]:text-sm max-sm:h-12 max-sm:w-10/12 max-sm:mx-auto"
                    placeholder="بحث"
                    value={search}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearch(value);
                    }}
                  />
                </div>
                <div className=" overflow-auto flex-1 pe-1 py-1 pt-2">
                  <Toaster
                    richColors={true}
                    position="top-left"
                    theme="light"
                    closeButton
                  />

                  {isFetching ? <PageLoader /> : children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </SearchProvider>
    </AuthGuard>
  );
}
