import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import SearchIcon from "~/components/icons/SearchIcon";
import InputText from "~/components/ui/InputText";
import Logo from "~/components/ui/Logo";
import Wrapper from "~/components/ui/Wrapper";

function Navbar() {
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, [isSearchVisible]);

  return (
    <header className="border-b-[1px] border-gray pb-[96px] sm:pb-0">
      <Wrapper className="bg-white fixed z-50 sm:static">
        <div className="flex justify-between items-start sm:items-center sm:flex-row flex-col">
          <div
            className={classNames(
              "flex justify-between items-center sm:justify-start w-full sm:w-auto sm:mb-0",
              {
                "mb-[14px]": isSearchVisible,
              }
            )}
          >
            <Link to="/" className="block mr-0  sm:mr-[40px]  lg:mr-[149px]">
              <Logo className="min-w-[139px]" />
            </Link>
            <div
              className={classNames(
                "sm:hidden w-[48px] h-[48px] rounded-full bg-primary flex items-center justify-center",
                {
                  hidden: isSearchVisible,
                }
              )}
              onClick={() => {
                setIsSearchVisible(true);
              }}
            >
              <SearchIcon className="min-w-5 [&>path]:stroke-white" />
            </div>
          </div>
          <div
            className={classNames("w-full flex sm:flex", {
              hidden: !isSearchVisible,
              flex: !isSearchVisible,
            })}
          >
            <InputText
              iconLeft={<SearchIcon className="min-w-5 hidden sm:block" />}
              placeholder="Поиск по товарам, категориям и продавцам"
              labelClassName="w-full rounded-r-[6px]"
              onBlur={() => setIsSearchVisible(false)}
              ref={searchInputRef}
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
