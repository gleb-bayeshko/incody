import { Link } from "react-router";
import SearchIcon from "~/components/icons/SearchIcon";
import InputText from "~/components/ui/InputText";
import Logo from "~/components/ui/Logo";
import Wrapper from "~/components/ui/Wrapper";

function Navbar() {
  return (
    <header className="border-b-[1px] border-gray">
      <Wrapper>
        <div className="flex justify-between items-start sm:items-center sm:flex-row flex-col">
          <Link
            to="/"
            className="mr-0  sm:mr-[40px]  lg:mr-[149px] mb-[14px] sm:mb-0"
          >
            <Logo className="min-w-[139px]" />
          </Link>
          <div className="w-full flex">
            <InputText
              iconLeft={<SearchIcon className="min-w-5 hidden sm:block" />}
              placeholder="Поиск по товарам, категориям и продавцам"
              labelClassName="w-full rounded-r-[6px]"
              type="search"
            />
            <button className="btn btn-md btn-primary ml-1 rounded-l-[6px] w-12 sm:w-30 px-3.5">
              <span className="hidden sm:block">Найти</span>
              <SearchIcon className="block sm:hidden [&>path]:stroke-white" />
            </button>
          </div>
        </div>
      </Wrapper>
    </header>
  );
}

export default Navbar;
