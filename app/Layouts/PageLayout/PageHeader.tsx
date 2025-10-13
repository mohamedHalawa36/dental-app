import { useEffect } from "react";
import { useLocation } from "react-router";
import Input from "~/Components/common/Input";
import Sheet from "~/Components/common/Sheet";
import AddNew from "~/Components/icons/AddNew";
import Search from "~/Components/icons/Search";
import Sidebar from "~/Components/Sidebar/Sidebar";
import usePageContext from "~/hooks/usePageContext";
import useUserLinks from "~/hooks/useUserLinks";

type HeaderProps = {
  title: string;
  addBtn?: boolean;
};

export default function PageHeader({ title, addBtn }: HeaderProps) {
  const {
    search,
    setSearch,
    setAddNewOpen,
    setIsMobileSidebarOpen,
    isMobileSidebarOpen,
  } = usePageContext();

  const pathName = useLocation().pathname;

  const links = useUserLinks();

  const activeLink = links.find((link) => link.href === pathName);
  const activeLinkHasSearch = activeLink?.hasSearch;

  useEffect(() => {
    setSearch("");
  }, [pathName, setSearch]);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathName, setIsMobileSidebarOpen]);

  return (
    <div className="flex justify-between from-primary from-20% to-secondary max-sm:flex-col max-sm:gap-2.5 max-sm:rounded-b-[2rem] max-sm:bg-gradient-to-l max-sm:px-2 max-sm:py-4 sm:items-start">
      <div className="flex gap-2">
        <div className="lg:hidden">
          <Sheet
            trigger={
              <img
                src="/images/logo.webp"
                alt="logo"
                className="h-9 drop-shadow-2xl"
              />
            }
            title=""
            isOpen={isMobileSidebarOpen}
            setIsOpen={setIsMobileSidebarOpen}
          >
            <Sidebar className="h-full w-full max-sm:rounded-e-2xl" />
          </Sheet>
        </div>
        <div className="relative flex gap-1.5 max-sm:flex-1">
          <h4 className="text-2xl font-semibold max-sm:text-zinc-100 sm:text-3xl">
            {title}
          </h4>

          {!!addBtn && (
            <button
              type="button"
              onClick={() => setAddNewOpen(true)}
              className="self-start"
            >
              <AddNew className="size-10 max-sm:size-8" />
            </button>
          )}
        </div>
      </div>
      {activeLinkHasSearch && (
        <Input
          icon={<Search />}
          className="text-sm max-sm:mx-auto max-sm:h-9 max-sm:w-11/12 max-sm:px-5 sm:w-80 max-sm:[&>div>input]:text-sm max-sm:[&>div>input]:placeholder:text-sm"
          placeholder="بحث"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
          }}
        />
      )}
    </div>
  );
}
