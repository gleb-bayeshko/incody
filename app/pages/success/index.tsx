import Wrapper from "~/components/ui/Wrapper";
import Meta from "~/components/widgets/Meta";
import CopyIcon from "~/components/icons/CopyIcon";
import { toast } from "react-toastify";
import BreadcrumbBack from "~/components/ui/BreadcrumbBack";
import {
  Navigate,
  useNavigate,
  useSearchParams,
} from "react-router";
import productApi from "~/api/productApi";
import { useQuery } from "@tanstack/react-query";

export default function Success() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  const { data, isPending } = useQuery({
    queryKey: ["successTransactionInfo", token],
    queryFn: async () => {
      return productApi.getTransactionSuccessInfo(token || "").catch(() => {
        navigate("/pay/fail");
      });
    },
    enabled: !!token,
    retry: false,
  });

  const handleCopyClick = () => {
    if (!data?.key) return;
    navigator.clipboard.writeText(data?.key);
    toast.success("Ключ скопирован");
  };

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <Wrapper className="h-full">
      <Meta
        title={`Успешная оплата`}
        description={`Incody `}
        ogTitle={`Успешная оплата`}
        ogDescription={`Incody`}
      />
      <BreadcrumbBack link="/" text="К покупкам" className="" />
      {isPending ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="loading loading-spinner loading-xl text-primary" />
        </div>
      ) : (
        <section className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col justify-center">
            {data?.title && (
              <h1 className="font-bold text-2xl text-center mt-6 sm:mt-0">
                {data?.title}
              </h1>
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
      )}
    </Wrapper>
  );
}
