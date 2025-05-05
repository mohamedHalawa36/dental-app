import { useContext, type ReactNode } from "react";
import Input from "~/Components/common/Input";
import Sheet from "~/Components/common/Sheet";
import Search from "~/Components/icons/Search";
import Sidebar from "~/Components/Sidebar/Sidebar";
import { SearchContext } from "~/Contexts/SearchContext";

type HeaderProps = {
  title: string;
  addBtn?: ReactNode;
};

export default function PageHeader({ title, addBtn }: HeaderProps) {
  const { search, setSearch } = useContext(SearchContext);

  return (
    <div className="flex justify-between from-primary from-20% to-secondary max-sm:flex-col max-sm:gap-2.5 max-sm:rounded-b-[2rem] max-sm:bg-gradient-to-l max-sm:px-2 max-sm:py-4 sm:items-start">
      <div className="flex gap-2">
        <div className="lg:hidden">
          <Sheet
            trigger={
              <img
                src="/images/logo.png"
                alt="logo"
                className="h-9 drop-shadow-2xl"
              />
            }
            title=""
          >
            <Sidebar className="h-full w-full max-sm:rounded-e-2xl" />
          </Sheet>
        </div>
        <div className="relative flex gap-3 max-sm:flex-1">
          <h4 className="text-2xl font-semibold max-sm:text-zinc-100 sm:text-3xl">
            {title}
          </h4>

          {!!addBtn && addBtn}
        </div>
      </div>
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
    </div>
  );
}
