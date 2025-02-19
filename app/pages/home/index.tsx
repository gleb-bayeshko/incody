import Wrapper from "~/components/ui/Wrapper";
import { initialData } from "~/utils/mock/initialData";
import { useEffect, useState } from "react";
import Categories from "~/components/widgets/Categories";
import Category from "~/components/widgets/Categories/Category";
import type { InitialData } from "./types";
import ProductCard from "~/components/widgets/ProductCard";
import AboutUs from "~/components/widgets/AboutUs";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Incody" },
    { name: "description", content: "Главная страница" },
  ];
}

export default function Home() {
  const [data, setData] = useState<InitialData>({});

  useEffect(() => {
    if (import.meta.env.MODE === "development") {
      window.__INITIAL_DATA__ = initialData;
    }

    window.__INITIAL_DATA__ = initialData;

    setData(window.__INITIAL_DATA__);
  }, []);

  return (
    <Wrapper>
      <section>
        <h2 className="">Сервисы</h2>
        <Categories className="my-6" onChange={(id) => console.log(id)}>
          {data?.categories?.map(({ id, name }) => (
            <Category id={id} key={id}>
              {name}
            </Category>
          ))}
        </Categories>
      </section>
      <section>
        <h2 className="mb-6">Товары</h2>
        <div className="border-b-[1px] border-gray pb-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {data?.products?.map(
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
          <div className="flex justify-center">
            <button className="btn btn-outline w-full md:w-[264px] mt-3 sm:mt-6 text-base font-bold">
              Показать всё
            </button>
          </div>
        </div>
      </section>
      <AboutUs description={data.about?.description} />
    </Wrapper>
  );
}
