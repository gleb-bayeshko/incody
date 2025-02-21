import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import Logo from "~/components/ui/Logo";
import Wrapper from "~/components/ui/Wrapper";
import type { InitialData } from "~/pages/home/types";
import type { ProductData } from "~/pages/product/types";
import formatPhoneNumber from "~/utils/helpers/formatPhoneToStandart";

type ContactsType = InitialData[keyof Pick<InitialData, "contacts">];

declare const window: {
  __INITIAL_DATA__: InitialData | ProductData;
} & Window;

function Footer() {
  const [data, setData] = useState<ContactsType>({});
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setData((window.__INITIAL_DATA__ as InitialData).contacts);
    } else {
      setData({
        support_button: (window.__INITIAL_DATA__ as ProductData).support_button,
      });
    }
  }, [location, window.__INITIAL_DATA__]);

  return (
    <footer className="border-t-[1px] border-gray">
      <Wrapper className="flex lg:justify-between xl:items-center flex-col xl:flex-row">
        <div className="flex gap-x-12 lg:items-center flex-col lg:flex-row lg:justify-between xl:justify-start">
          <Link to="/">
            <Logo className="min-w-[139px]" />
          </Link>
          {location.pathname === "/" && (
            <ul className="leading-[24px] pt-6 lg:pt-0">
              <li>
                <a
                  href={`mailto:${data?.email}`}
                  className="text-nowrap"
                  target="_blank"
                >
                  <span className="font-light text-gray-accent">E-mail:</span>
                  {` `}
                  <span className="font-light text-base">{data?.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={data?.support_button}
                  className="text-nowrap"
                  target="_blank"
                >
                  <span className="font-light text-gray-accent">Telegram:</span>
                  {` `}
                  <span className="font-light text-base">{data?.telegram}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${formatPhoneNumber(data?.phone || "")}`}
                  className="text-nowrap"
                  target="_blank"
                >
                  <span className="font-light text-gray-accent">Телефон:</span>
                  {` `}
                  <span className="font-light text-base">{data?.phone}</span>
                </a>
              </li>
            </ul>
          )}
          <a
            href={data?.support_button}
            className="mt-6 lg:mt-0"
            target="_blank"
          >
            <button className="btn btn-outline w-full lg:w-[256px] text-base font-bold mb-6 lg:mb-0">
              Связаться с поддержкой
            </button>
          </a>
        </div>
        <div className="flex flex-col xl:items-end mt-0 lg:mt-6 xl:mt-0">
          <div className="flex flex-col sm:flex-row xl:flex-col 2xl:flex-row 2xl:items-center gap-x-5">
            <a
              className="font-light text-base text-gray-accent text-nowrap sm:text-end hover:underline"
              href="/oferta"
              target="_blank"
            >
              Пользовательское соглашение
            </a>
            <a
              className="font-light text-base text-gray-accent text-nowrap sm:text-end hover:underline"
              href="/policy"
              target="_blank"
            >
              Политика конфиденциальности
            </a>
            <span className="hidden xl:flex font-light text-base text-gray-accent justify-end text-end mt-2 lg:mt-0">
              © Incody.io, 2025
            </span>
          </div>
          <span className="flex xl:hidden font-light text-base text-gray-accent justify-start text-start mt-6">
            © Incody.io, 2025
          </span>
        </div>
      </Wrapper>
    </footer>
  );
}

export default Footer;
