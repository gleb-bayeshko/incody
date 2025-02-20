import { useEffect, useState } from "react";
import type { Route } from "../home/+types";
import { productData } from "~/utils/mock/productData";
import type { Offer, Product, ProductData } from "./types";
import getImageUrl from "~/utils/helpers/getImageUrl";
import Wrapper from "~/components/ui/Wrapper";
import ArrowLeft from "~/components/icons/ArrorLeft";
import { Link } from "react-router";
import Rating from "~/components/ui/Rating";
import createWordPluralizer from "~/utils/helpers/createWordPluralizer";
import Offers from "~/components/widgets/Offers/Offers";
import InputText from "~/components/ui/InputText";
import Meta from "~/components/widgets/Meta";

declare const window: {
  __INITIAL_DATA__: ProductData;
} & Window;

export default function Product() {
  const [data, setData] = useState<ProductData>(window.__INITIAL_DATA__);
  const [currentOfferId, setCurrentOfferId] = useState<number | undefined>(
    data?.offers?.[0]?.id
  );

  const ratingPluralizer = createWordPluralizer("оцен", {
    one: "ка",
    few: "ки",
    many: "ок",
  });

  const handleOfferChange = (id: number) => {
    setCurrentOfferId(id);
  };

  useEffect(() => {
    setData(window.__INITIAL_DATA__);
    setCurrentOfferId(window.__INITIAL_DATA__.offers?.[0]?.id);
  }, []);

  return (
    <Wrapper>
      <Meta
        title={`Купить ${data.product?.title}`}
        description={`${data.product?.description}`}
        ogTitle={`Купить ${data.product?.title}`}
        ogDescription={`${data.product?.description}`}
        ogImageUrl={`${getImageUrl(data.product?.image)}`}
      />
      <Link
        to="/"
        className="mb-6 flex items-center hover:contrast-20 duration-100"
      >
        <ArrowLeft className="mr-3" />
        <div className="text-gray-accent text-base font-light">На главную</div>
      </Link>
      <section className="flex gap-x-6">
        <div className="w-[264px] hidden md:block">
          <img
            src={getImageUrl(data.product?.image)}
            className="aspect-square object-cover object-center rounded-xl w-full"
          />
        </div>
        <div className="w-full">
          <div className="flex gap-x-6 lg:gap-x-0">
            <div className="max-w-[104px] lg:max-w-[264px] lg:w-[264px] block md:hidden">
              <img
                src={getImageUrl(data.product?.image)}
                className="aspect-square object-cover object-center rounded-xl w-full"
              />
            </div>
            <div>
              <div className="flex items-center cursor-pointer hover:[&>span]:underline flex-nowrap w-min">
                <Rating rating={data?.product?.rating} />
                <span className="block text-nowrap ml-3 text-primary font-light text-base">{`${
                  data.product?.rating_amount
                } ${ratingPluralizer(data.product?.rating_amount || 0)}`}</span>
              </div>
              <h1 className="mt-3 font-bold text-xl lg:text-2xl">
                {data?.product?.title}
              </h1>
            </div>
          </div>
          <div className="grid xl:grid-cols-[692px_auto] gap-x-0 mt-6">
            <div className="xl:pr-6">
              <p className="font-light text-base">
                {data.product?.description}
              </p>
              <Offers
                offers={data.offers || []}
                selectedOfferId={currentOfferId}
                className="mt-6 lg:mt-3"
                onChange={handleOfferChange}
              />
              <InputText
                labelClassName="mt-3 w-full"
                placeholder="E-mail для передачи доступа"
              />
              <button className="btn btn-md btn-primary w-full mt-3">{`Купить навсегда за ${
                data.offers?.find(({ id }) => id === currentOfferId)?.price
              }  ₽`}</button>
            </div>
            <div className="border-t-[1px] pt-6 mt-6 xl:mt-0 xl:border-t-0 xl:pt-0 xl:pl-6 xl:border-l-[1px] border-gray">
              <div
                dangerouslySetInnerHTML={{
                  __html: getInstructionHtml(data.product?.instruction),
                }}
                className="[&>div:not(:first-child)]:mt-6 [&_p]:font-light [&_p]:text-base"
              />
            </div>
          </div>
        </div>
      </section>
      <script type="application/ld+json">{JSON.stringify(getLD(data))}</script>
    </Wrapper>
  );
}

function getLD(data: ProductData) {
  const product = data.product;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.title,
    image: getImageUrl(product?.image),
    description: product?.description,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product?.rating,
      reviewCount: product?.rating_amount,
    },
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "RUB",
      price: data?.offers?.[0]?.price,
    },
  };
}

function getInstructionHtml(instruction: string = ""): string {
  return instruction
    .split("\r\n\r\n")
    .map(
      (block) =>
        `<div>${block
          .split("\r\n")
          .map((paragraph) => `<p>${paragraph}</p>`)
          .join("")}</div>`
    )
    .join("");
}
