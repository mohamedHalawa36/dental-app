import { Outlet, useLocation } from "react-router";
import Sidebar from "~/Components/Sidebar/Sidebar";
import PageProvider from "~/Contexts/PageContext";
import useUserLinks from "~/hooks/useUserLinks";
import PageHeader from "~/Layouts/PageLayout/PageHeader";

export default function PageLayout() {
  const { pathname } = useLocation();
  const links = useUserLinks();

  const activeLink = links.find((link) => link.href === pathname);
  const pageTitle =
    activeLink?.id === "home" ? "مواعيد اليوم" : activeLink?.label;
  const hasNew = activeLink?.addNew;

  return (
    <div className="flex h-full w-full flex-col lg:p-4 xl:p-6 2xl:p-7">
      <div className="flex h-full">
        <div className="max-lg:hidden">
          <Sidebar />
        </div>
        <main className="max-h-full flex-1 rounded-e-2xl bg-gradient-to-b from-cyan-200/30 to-fuchsia-200/30 to-70% shadow-xl">
          <PageProvider>
            <div className="flex h-full w-full flex-col sm:gap-3 sm:px-5 sm:pb-3 sm:pt-4">
              <PageHeader title={pageTitle as string} addBtn={hasNew} />
              <div className="flex-1 overflow-auto py-1 max-sm:pb-2">
                <Outlet />
              </div>
            </div>
          </PageProvider>
        </main>
      </div>
    </div>
  );
}
