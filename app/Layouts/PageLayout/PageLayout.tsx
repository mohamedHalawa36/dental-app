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
        <div className="flex h-full w-full flex-col lg:p-4">
          <div className="flex h-full">
            <div className="max-lg:hidden">
              <Sidebar />
            </div>
            <main className="max-h-full flex-1 rounded-e-2xl bg-gradient-to-b from-cyan-200/30 to-fuchsia-200/30 to-70% shadow-xl">
              <div className="flex h-full w-full flex-col sm:px-5 sm:py-6">
                <PageHeader title={pageTitle as string} addBtn={addBtn} />
                <div className="flex-1 overflow-auto py-1 pe-1 pt-2">
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
