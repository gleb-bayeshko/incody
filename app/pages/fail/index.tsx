import Wrapper from "~/components/ui/Wrapper";
import Meta from "~/components/widgets/Meta";
import BreadcrumbBack from "~/components/ui/BreadcrumbBack";
import { useQuery } from "@tanstack/react-query";
import productApi from "~/api/productApi";

export default function Success() {
  const { data, isPending } = useQuery({
    queryKey: ["failTransactionInfo"],
    queryFn: async () => {
      return productApi.getTransactionFailInfo();
    },
  });

  return (
    <Wrapper className="w-full h-full">
      <Meta
        title={`Ошибка оплаты`}
        description={`Incody `}
        ogTitle={`Ошибка оплаты`}
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
              <h1 className="font-bold text-2xl text-center">{data?.title}</h1>
            )}
            {data?.text && (
              <p className="font-light mt-3 text-base text-center">
                {data?.text}
              </p>
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
      )}
    </Wrapper>
  );
}
