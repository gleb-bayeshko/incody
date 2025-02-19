import classNames from "classnames";
import { Link } from "react-router";
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
          <Link to={`/${shortName}`}>
            <img
              src={image}
              className="aspect-square object-cover object-center rounded-xl max-w-22"
              alt={shortName}
            />
          </Link>
          <div className="flex flex-col justify-between">
            <Link to={`/${shortName}`}>
              <p className="text-base font-light hover:underline line-clamp-2">
                {title}
              </p>
            </Link>
            <div className="font-bold text-xl">{priceText}</div>
          </div>
        </div>
      </div>
      <button className="block mt-3 sm:hidden btn btn-md btn-primary btn-block">
        Купить
      </button>

      {/* Desktop */}
      <div className="sm:flex-col hidden sm:flex">
        <Link to={`/${shortName}`}>
          <img
            src={image}
            className="aspect-square object-cover object-center rounded-xl"
            alt={shortName}
          />
        </Link>
        <Link to={`/${shortName}`}>
          <p className="text-base font-light hover:underline mt-6 mb-3 line-clamp-3">
            {title}
          </p>
        </Link>
      </div>
      <div className="hidden sm:block">
        <div className="font-bold text-xl mb-6">{priceText}</div>
        <button className="btn btn-md btn-primary btn-block">Купить</button>
      </div>
    </div>
  );
}

export default ProductCard;
