import { Outlet, useLocation } from "react-router";
import { links } from "~/Components/Sidebar/links";
import Sidebar from "~/Components/Sidebar/Sidebar";
import SearchProvider from "~/Contexts/PageContext";
import AuthGuard from "~/Guards/AuthGuard";
import PageHeader from "~/Layouts/PageLayout/PageHeader";

export default function PageLayout() {
  const { pathname } = useLocation();

  const activeLink = links.find((link) => link.href === pathname);
  const pageTitle =
    activeLink?.id === "home" ? "مواعيد اليوم" : activeLink?.label;
  const hasNew = activeLink?.addNew;

  return (
    <AuthGuard>
      <div className="flex h-full w-full flex-col lg:p-4">
        <div className="flex h-full">
          <div className="max-lg:hidden">
            <Sidebar />
          </div>
          <main className="max-h-full flex-1 rounded-e-2xl bg-gradient-to-b from-cyan-200/30 to-fuchsia-200/30 to-70% shadow-xl">
            <SearchProvider>
              <div className="flex h-full w-full flex-col sm:gap-3 sm:px-5 sm:py-6">
                <PageHeader title={pageTitle as string} addBtn={hasNew} />
                <div className="flex-1 overflow-auto py-1 pe-1">
                  <Outlet />
                </div>
              </div>
            </SearchProvider>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
