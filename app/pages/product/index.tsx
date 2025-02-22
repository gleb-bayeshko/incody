import { useEffect, useState } from "react";
import type { Product, ProductData } from "./types";
import getImageUrl from "~/utils/helpers/getImageUrl";
import Wrapper from "~/components/ui/Wrapper";
import { useNavigate, useParams } from "react-router";
import Rating from "~/components/ui/Rating";
import createWordPluralizer from "~/utils/helpers/createWordPluralizer";
import Offers from "~/components/widgets/Offers/Offers";
import InputText from "~/components/ui/InputText";
import Meta from "~/components/widgets/Meta";
import ReviewsModal from "~/components/modals/ReviewsModal";
import BreadcrumbBack from "~/components/ui/BreadcrumbBack";
import { useQuery } from "@tanstack/react-query";
import productApi from "~/api/productApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { Route } from "./+types";

type Inputs = {
  emailForProductBuy: string;
};

export default function Product({ params }: Route.ComponentProps) {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["productCardData", params.shortName],
    queryFn: async () => {
      return productApi.getProductCardData(params?.shortName || "");
    },
    enabled: !!params.shortName,
  });

  const [currentOfferId, setCurrentOfferId] = useState<number | undefined>(
    data?.offers?.[0]?.id
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const navigate = useNavigate();

  const { data: reviewsData } = useQuery({
    queryKey: ["productsReviews", data?.product?.short_name],
    queryFn: () => {
      return productApi.getProductsReviews(data?.product?.short_name || "");
    },
    enabled: !!data?.product?.short_name,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const ratingPluralizer = createWordPluralizer("оцен", {
    one: "ка",
    few: "ки",
    many: "ок",
  });

  const handleOfferChange = (id: number) => {
    setCurrentOfferId(id);
  };

  const handleReviewsClick = () => {
    setIsModalOpen(true);
  };

  const handleReviewsModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (data: Inputs) => {
    setIsFormLoading(true);

    if (!currentOfferId) return;

    await productApi
      .postProductTransaction(data?.emailForProductBuy, currentOfferId)
      .catch(() => {
        toast.error("Произошла ошибка");
      })
      .finally(() => {
        setIsFormLoading(false);
      });

    navigate("/merchant");
  };

  useEffect(() => {
    if (isSuccess) {
      setCurrentOfferId(data?.offers?.[0]?.id);
    }
  }, [isPending, isSuccess, data]);

  return (
    <Wrapper className="h-full">
      <Meta
        title={`Купить ${data?.product?.title}`}
        description={`${data?.product?.description}`}
        ogTitle={`Купить ${data?.product?.title}`}
        ogDescription={`${data?.product?.description}`}
        ogImageUrl={`${getImageUrl(data?.product?.image)}`}
      />
      <BreadcrumbBack link="/" text="На главную" className="mb-6" />
      {isPending ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="loading loading-spinner loading-xl text-primary" />
        </div>
      ) : (
        <>
          <section className="flex gap-x-6">
            <div className="w-[264px] hidden md:block">
              <img
                src={getImageUrl(data?.product?.image)}
                className="aspect-square object-cover object-center rounded-xl w-full"
              />
            </div>
            <div className="w-full">
              <div className="flex gap-x-6 lg:gap-x-0">
                <div className="max-w-[104px] lg:max-w-[264px] lg:w-[264px] block md:hidden">
                  <img
                    src={getImageUrl(data?.product?.image)}
                    className="aspect-square object-cover object-center rounded-xl w-full"
                  />
                </div>
                <div>
                  <div
                    className="flex items-center cursor-pointer hover:[&>span]:underline flex-nowrap w-min"
                    onClick={handleReviewsClick}
                  >
                    <Rating rating={data?.product?.rating} />
                    <span className="block text-nowrap ml-3 text-primary font-light text-base">{`${
                      data?.product?.rating_amount
                    } ${ratingPluralizer(
                      data?.product?.rating_amount || 0
                    )}`}</span>
                  </div>
                  <h1 className="mt-3 font-bold text-xl lg:text-2xl">
                    {data?.product?.title}
                  </h1>
                </div>
              </div>
              <div className="grid xl:grid-cols-[692px_auto] gap-x-0 mt-6">
                <form
                  className="xl:pr-6"
                  onSubmit={handleSubmit(handleFormSubmit)}
                >
                  <p className="font-light text-base">
                    {data?.product?.description}
                  </p>
                  <Offers
                    offers={data?.offers || []}
                    selectedOfferId={currentOfferId}
                    className="mt-6 lg:mt-3"
                    onChange={handleOfferChange}
                  />
                  <InputText
                    labelClassName="mt-3 w-full"
                    placeholder="E-mail для передачи доступа"
                    {...register("emailForProductBuy", {
                      required: "Введите e-mail для передачи доступа",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Введите валидный email",
                      },
                    })}
                  />
                  {errors.emailForProductBuy && (
                    <div className="text-red-500 mt-3 md:ml-6 font-light text-center md:text-start">
                      {errors.emailForProductBuy.message}
                    </div>
                  )}
                  <button
                    disabled={isFormLoading}
                    className="btn btn-md btn-primary w-full mt-3"
                  >{`Купить`}</button>
                </form>
                <div className="border-t-[1px] pt-6 mt-6 xl:mt-0 xl:border-t-0 xl:pt-0 xl:pl-6 xl:border-l-[1px] border-gray">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: getInstructionHtml(data?.product?.instruction),
                    }}
                    className="[&>div:not(:first-child)]:mt-6 [&_p]:font-light [&_p]:text-base"
                  />
                </div>
              </div>
            </div>
          </section>
          <script type="application/ld+json">
            {JSON.stringify(getLD(data || {}))}
          </script>
          <ReviewsModal
            isOpen={isModalOpen}
            id="product-reviews-modal"
            onClose={handleReviewsModalClose}
            shortName={data?.product?.short_name}
            reviewsData={reviewsData || []}
          />
        </>
      )}
    </Wrapper>
  );
}

function getLD(data: ProductData) {
  const product = data?.product;

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
