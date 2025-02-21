import { useQuery } from "@tanstack/react-query";
import { Navigate, useSearchParams } from "react-router";
import productApi from "~/api/productApi";
import BreadcrumbBack from "~/components/ui/BreadcrumbBack";
import Wrapper from "~/components/ui/Wrapper";
import Meta from "~/components/widgets/Meta";
import ProductCard from "~/components/widgets/ProductCard";

export default function Search() {
  const [searchParams] = useSearchParams();

  const searchText = searchParams.get("searchQuery");

  const {
    data: productsData,
    isPending: isProductsDataPending,
    isSuccess: isProductsDataSuccess,
  } = useQuery({
    queryKey: ["productsBySearchQUery", searchText],
    queryFn: () => {
      return productApi.getProductsBySearchQuery(searchText || "");
    },
    enabled: !!searchText,
  });

  if (!searchText) {
    return <Navigate to="/" />;
  }

  return (
    <Wrapper>
      <Meta
        title={`Результаты поиска - ${searchText}`}
        description={`Incody `}
        ogTitle={`Результаты поиска - ${searchText}`}
        ogDescription={`Incody`}
      />
      <section>
        <BreadcrumbBack text="Назад" className="mb-6" />
        <h2 className="mb-6">Результаты поиска</h2>
        {!isProductsDataPending &&
          (productsData?.length > 0 ? (
            <div className="border-b-[1px] border-gray pb-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {productsData?.map(
                  ({ id, image, price_text, short_name, title }) => (
                    <ProductCard
                      key={id}
                      shortName={short_name}
                      image={image}
                      priceText={price_text}
                      title={title}
                    />
                  )
                )}
              </div>
            </div>
          ) : (
            <div className="text-center my-10 text-2xl font-light">
              К сожалению, по вашему запросу ничего не найдено
            </div>
          ))}
      </section>
    </Wrapper>
  );
}
