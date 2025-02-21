import Wrapper from "~/components/ui/Wrapper";
import type { SuccessData } from "./type";
import { useEffect, useState } from "react";
import Meta from "~/components/widgets/Meta";
import CopyIcon from "~/components/icons/CopyIcon";
import { toast } from "react-toastify";
import BreadcrumbBack from "~/components/ui/BreadcrumbBack";
import { Navigate } from "react-router";

declare const window: {
  __INITIAL_DATA__: SuccessData;
} & Window;

export default function Success() {
  const [data, setData] = useState<SuccessData>({});

  const handleCopyClick = () => {
    if (!data?.key) return;
    navigator.clipboard.writeText(data?.key);
    toast.success("Ключ скопирован");
  };

  useEffect(() => {
    setData(window.__INITIAL_DATA__);
  }, []);

  if (!data?.key) {
    return <Navigate to="/" replace />;
  }

  return (
    <Wrapper>
      <Meta
        title={`Успешная оплата`}
        description={`Incody `}
        ogTitle={`Успешная оплата`}
        ogDescription={`Incody`}
      />
      <BreadcrumbBack link="/" text="К покупкам" className="" />
      <section className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col justify-center">
          {data?.title && (
            <h1 className="font-bold text-2xl text-center">{data?.title}</h1>
          )}
          {data?.text && (
            <p className="font-light mt-3 text-base text-center">
              {data?.text}
            </p>
          )}
          {data?.key && (
            <div
              onClick={handleCopyClick}
              className="flex font-bold text-xl flex-nowrap justify-center items-center mt-12 cursor-pointer select-none"
            >
              {data?.key}
              <CopyIcon className="ml-3" />
            </div>
          )}
          {data?.activate_button_link && (
            <a
              href={data?.activate_button_link}
              className="flex justify-center"
              target="_blank"
            >
              <button className="btn btn-md btn-primary mt-12 w-full sm:w-auto">
                {data?.activate_button_text || "Активировать ключ"}
              </button>
            </a>
          )}
        </div>
      </section>
    </Wrapper>
  );
}
