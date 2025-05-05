import { useState, type ReactNode } from "react";
import { useLocation } from "react-router";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import { links } from "~/Components/Sidebar/links";
import Sidebar from "~/Components/Sidebar/Sidebar";
import SearchProvider from "~/Contexts/SearchContext";
import AuthGuard from "~/Guards/AuthGuard";
import PageHeader from "./PageHeader";

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
                <PageHeader title={pageTitle as string} addBtn={addBtn} />
                <div className=" overflow-auto flex-1 pe-1 py-1 pt-2">
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
