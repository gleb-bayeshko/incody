import Wrapper from "~/components/ui/Wrapper";
import type { FailData } from "./type";
import { useEffect, useState } from "react";
import Meta from "~/components/widgets/Meta";
import CopyIcon from "~/components/icons/CopyIcon";
import { toast } from "react-toastify";
import BreadcrumbBack from "~/components/ui/BreadcrumbBack";
import { Navigate } from "react-router";

declare const window: {
  __INITIAL_DATA__: FailData;
} & Window;

export default function Success() {
  const [data, setData] = useState<FailData>({});

  useEffect(() => {
    setData(window.__INITIAL_DATA__);
  }, []);

  if (!data?.title) {
    return <Navigate to="/" replace/>;
  }

  return (
    <Wrapper>
      <Meta
        title={`Ошибка оплаты`}
        description={`Incody `}
        ogTitle={`Ошибка оплаты`}
        ogDescription={`Incody`}
      />
      <BreadcrumbBack link="/" text="К покупкам" className="" />
      <section className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col justify-center">
          {data?.title && (
            <h1 className="font-bold text-2xl text-center">{data?.title}</h1>
          )}
          {data?.text && (
            <p className="font-light mt-3 text-base text-center">{data?.text}</p>
          )}
          <a
            href={data?.support_button}
            className="flex justify-center mt-12"
            target="_blank"
          >
            <button className="btn btn-outline w-full lg:w-auto text-base font-bold">
              Связаться с поддержкой
            </button>
          </a>
        </div>
      </section>
    </Wrapper>
  );
}
