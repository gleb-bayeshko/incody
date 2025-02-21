import Wrapper from "~/components/ui/Wrapper";
import { initialData } from "~/utils/mock/initialData";
import { useEffect, useState } from "react";
import Categories from "~/components/widgets/Categories";
import Category from "~/components/widgets/Categories/Category";
import type { InitialData, Product } from "./types";
import ProductCard from "~/components/widgets/ProductCard";
import AboutUs from "~/components/widgets/AboutUs";
import type { Route } from "./+types";
import Meta from "~/components/widgets/Meta";
import { useQuery } from "@tanstack/react-query";
import productApi from "~/api/productApi";

declare const window: {
  __INITIAL_DATA__: InitialData;
} & Window;

export default function Home() {
  const [data, setData] = useState<InitialData>({});
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(true);
  const [currentCategoryId, setCurrentCategoryId] = useState<
    number | string | null
  >(null);
  const [isMoreButtonClicked, setIsMoreButtonClicked] = useState(false);

  const {
    data: moreProducts,
    isPending: isMoreProductPending,
    refetch: fetchProductsMore,
    isSuccess: isMoreProductSuccess,
  } = useQuery({
    queryKey: ["productsMore", isMoreButtonClicked],
    queryFn: () => {
      return productApi
        .getProductsMore()
        .then((data) => setProductsData((prev) => [...prev, ...data]))
        .finally(() => {
          setIsMoreButtonClicked(false);
          setIsMoreButtonVisible(false);
        });
    },
    enabled: isMoreButtonClicked,
  });

  const {
    data: productsByCategory,
    isPending: isProductsByCategoryPending,
    isSuccess: isProductsByCategorySuccess,
  } = useQuery({
    queryKey: ["productsByCategory", currentCategoryId],
    queryFn: () => {
      return productApi.getProductsByCategoryId(currentCategoryId || "");
    },
    enabled: !!currentCategoryId,
  });

  const handleLoadMoreClick = () => {
    setIsMoreButtonClicked(true);
  };

  useEffect(() => {
    setData(window.__INITIAL_DATA__);
    setProductsData(window.__INITIAL_DATA__?.products || []);
  }, []);

  useEffect(() => {
    if (
      currentCategoryId &&
      !isProductsByCategoryPending &&
      isProductsByCategorySuccess
    ) {
      setProductsData(productsByCategory);
      setIsMoreButtonVisible(false);
    }

    if (!currentCategoryId) {
      setProductsData(window.__INITIAL_DATA__?.products || []);
      setIsMoreButtonVisible(true);
    }
  }, [
    currentCategoryId,
    isProductsByCategoryPending,
    isProductsByCategorySuccess,
  ]);

  return (
    <Wrapper>
      <Meta
        title={`Incody`}
        description={`Incody представляет собой крупную торговую площадку с трафиком более 2 млн визитов в месяц, которая специализируется на продаже игр, программного обеспечения, внутриигровых предметов, различных подписок и услуг. У нас собрано множество товаров от проверенных продавцов со всего мира. Мы стремимся обеспечить нашим клиентам легкий доступ к продуктам и услугам, чтобы сделать их жизнь более удобной.`}
        ogTitle={`Incody`}
        ogDescription={`Incody представляет собой крупную торговую площадку с трафиком более 2 млн визитов в месяц, которая специализируется на продаже игр, программного обеспечения, внутриигровых предметов, различных подписок и услуг. У нас собрано множество товаров от проверенных продавцов со всего мира. Мы стремимся обеспечить нашим клиентам легкий доступ к продуктам и услугам, чтобы сделать их жизнь более удобной.`}
      />
      <section>
        <h2 className="">Сервисы</h2>
        <Categories className="my-6" onChange={setCurrentCategoryId}>
          {data?.categories?.map(({ id, name }) => (
            <Category id={id} key={id}>
              {name}
            </Category>
          ))}
        </Categories>
      </section>
      <section>
        <h2 className="mb-6">Товары</h2>
        <div className="relative">
          {currentCategoryId && isProductsByCategoryPending && (
            <div className="absolute flex items-center justify-center left-0 top-0 w-full h-full bg-gray-100 opacity-25">
              <span className="loading loading-spinner"></span>
            </div>
          )}
          {productsData.length > 0 ? (
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
              {isMoreButtonVisible && (
                <div className="flex justify-center">
                  <button
                    className="btn btn-outline w-full md:w-[264px] mt-3 sm:mt-6 text-base font-bold"
                    disabled={isMoreButtonClicked}
                    onClick={handleLoadMoreClick}
                  >
                    {isMoreButtonClicked && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Показать всё
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center my-10 text-2xl font-light">
              В настоящее время товары в этой категории отсутствуют.
            </div>
          )}
        </div>
      </section>
      <AboutUs description={data?.about?.description} />
    </Wrapper>
  );
}
