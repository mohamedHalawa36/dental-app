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
    <div className="flex sm:items-start max-sm:gap-2.5 justify-between max-sm:flex-col max-sm:bg-gradient-to-l from-primary from-20% to-secondary max-sm:py-4 max-sm:px-2 max-sm:rounded-b-[2rem]">
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
            {title}
          </h4>

          {!!addBtn && addBtn}
        </div>
      </div>
      <Input
        icon={<Search />}
        className="sm:w-80 text-sm max-sm:[&>div>input]:placeholder:text-sm max-sm:[&>div>input]:text-sm max-sm:px-5 max-sm:mx-auto"
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
