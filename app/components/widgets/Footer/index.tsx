import { useEffect, useState } from "react";
import { Link } from "react-router";
import Logo from "~/components/ui/Logo";
import Wrapper from "~/components/ui/Wrapper";
import type { InitialData } from "~/pages/home/types";
import formatPhoneNumber from "~/utils/helpers/formatPhoneToStandart";

type ContactsType = InitialData[keyof Pick<InitialData, "contacts">];

function Footer() {
  const [data, setData] = useState<ContactsType>({});

  useEffect(() => {
    setData(window.__INITIAL_DATA__.contacts);
  }, []);

  return (
    <footer className="border-t-[1px] border-gray">
      <Wrapper className="flex lg:justify-between xl:items-center flex-col xl:flex-row">
        <div className="flex gap-x-12 lg:items-center flex-col lg:flex-row lg:justify-between xl:justify-start">
          <Link to="/">
            <Logo className="min-w-[139px]" />
          </Link>
          <ul className="leading-[24px] py-6 lg:py-0">
            <li>
              <a href={`mailto:${data?.email}`} className="text-nowrap">
                <span className="font-light text-gray-accent">E-mail:</span>
                {` `}
                <span className="font-light text-base">{data?.email}</span>
              </a>
            </li>
            <li>
              <a href={data?.support_button} className="text-nowrap">
                <span className="font-light text-gray-accent">Telegram:</span>
                {` `}
                <span className="font-light text-base">{data?.telegram}</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${formatPhoneNumber(data?.phone || "")}`}
                className="text-nowrap"
              >
                <span className="font-light text-gray-accent">Телефон:</span>
                {` `}
                <span className="font-light text-base">{data?.phone}</span>
              </a>
            </li>
          </ul>
          <a href={data?.support_button}>
            <button className="btn btn-outline w-full lg:w-[256px] text-base font-bold mb-6 lg:mb-0">
              Связаться с поддержкой
            </button>
          </a>
        </div>
        <div className="flex xl:items-center flex-col lg:flex-row lg:mt-3 xl:mt-0 lg:justify-center xl:justify-start">
          <a
            className="font-light text-base text-gray-accent mb-6 lg:mb-0 lg:mr-6"
            href="/"
          >
            Политика конфиденциальности
          </a>
          <span className="font-light text-base text-gray-accent">
            © Incody.io, 2025
          </span>
        </div>
      </Wrapper>
    </footer>
  );
}

export default Footer;
