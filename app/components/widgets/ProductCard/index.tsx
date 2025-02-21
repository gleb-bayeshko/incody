import classNames from "classnames";
import { Link } from "react-router";
import getImageUrl from "~/utils/helpers/getImageUrl";
import type { ClassNameProp } from "~/utils/types";

interface ProductCard extends ClassNameProp {
  shortName?: string;
  title?: string;
  image?: string;
  priceText?: string;
}

function ProductCard({
  image,
  title,
  priceText,
  shortName,
  className,
}: ProductCard) {
  const imageUrl = getImageUrl(image);
  const productLink = `/product/${shortName}`;

  return (
    <div
      className={classNames(
        "border-[1px] border-gray p-3 rounded-t-3xl rounded-b-[36px] w-full sm:flex sm:flex-col sm:justify-between",
        className
      )}
    >
      {/* Mobile */}
      <div className="block sm:hidden">
        <div className="flex gap-x-3">
          <Link to={productLink}>
            <img
              src={imageUrl}
              className="aspect-square object-cover object-center rounded-xl max-w-22"
              alt={shortName}
            />
          </Link>
          <div className="flex flex-col justify-between">
            <Link to={productLink}>
              <p className="text-base font-light hover:underline line-clamp-2">
                {title}
              </p>
            </Link>
            <div className="font-bold text-xl">{priceText}</div>
          </div>
        </div>
      </div>
      <Link to={productLink} className="block mt-3 sm:hidden">
        <button className="btn btn-md btn-primary btn-block">Купить</button>
      </Link>

      {/* Desktop */}
      <div className="sm:flex-col hidden sm:flex">
        <Link
          to={productLink}
          className="rounded-xl overflow-hidden hover:[&>img]:scale-110"
        >
          <img
            src={imageUrl}
            className="aspect-square object-cover object-center duration-100"
            alt={shortName}
          />
        </Link>
        <Link to={productLink} relative="path">
          <p className="text-base font-light hover:underline mt-6 mb-3 line-clamp-3">
            {title}
          </p>
        </Link>
      </div>
      <div className="hidden sm:block">
        <div className="font-bold text-xl mb-6">{priceText}</div>
        <Link to={productLink}>
          <button className="btn btn-md btn-primary btn-block">Купить</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
