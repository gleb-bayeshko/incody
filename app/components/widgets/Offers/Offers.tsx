import classNames from "classnames";
import { useEffect, useState } from "react";
import CheckIcon from "~/components/icons/CheckIcon";
import type { Offer } from "~/pages/product/types";
import type { ClassNameProp } from "~/utils/types";

interface OffersProps extends ClassNameProp {
  offers: Offer[];
  selectedOfferId?: number;
  onChange?: (offerId: number) => void;
}

function Offers({ offers, onChange, selectedOfferId, className }: OffersProps) {
  const [currentOfferId, setCurrentOfferId] = useState<number | undefined>(
    selectedOfferId
  );

  function handleClick(id: number) {
    setCurrentOfferId(id);
    onChange?.(id);
  }

  useEffect(() => {
    setCurrentOfferId(selectedOfferId);
  }, [selectedOfferId]);

  return (
    <div
      className={classNames(
        "flex gap-y-1 lg:gap-y-0 lg:gap-x-1 lg:pt-[13px] flex-col lg:flex-row",
        className
      )}
    >
      {offers.map(
        (
          { id, bage_text, bage_color, bage_text_color, currency, name, price },
          i,
          arr
        ) => (
          <button
            key={id}
            className={classNames(
              "btn btn-outline w-full grow-1 basis-0 font-light text-base text-nowrap relative gap-0 justify-between lg:justify-center px-3 py-6",
              {
                "rounded-b-[6px] lg:rounded-bl-3xl lg:rounded-r-[6px]": i === 0,
                "rounded-t-[6px] lg:rounded-tr-3xl lg:rounded-l-[6px]":
                  i === arr.length - 1,
                "rounded-[6px]": i !== 0 && i !== arr.length - 1,
                "btn-outline-active": currentOfferId === id,
              }
            )}
            onClick={() => handleClick(id)}
            type="button"
          >
            <div className="flex items-center">
              <CheckIcon
                className={classNames(
                  "duration-100 w-full h-full lg:absolute lg:left-3 lg:top-1/2 lg:translate-y-[-50%]",
                  {
                    "max-w-6 max-h-6": currentOfferId === id,
                    "max-w-0 max-h-0": currentOfferId !== id,
                  }
                )}
              />
              <div
                className={classNames("duration-100", {
                  "ml-3": currentOfferId === id,
                })}
              >{`${name}, ${price} ${currency}`}</div>
            </div>
            {bage_text && (
              <div
                className={classNames(
                  "relative text-nowrap lg:absolute lg:top-[-13px] lg:left-2/4 lg:translate-x-[-50%] font-light text-base rounded-3xl h-6 px-3 flex items-center"
                )}
                style={{ color: bage_text_color, backgroundColor: bage_color }}
              >
                {`${bage_text}`}
              </div>
            )}
          </button>
        )
      )}
    </div>
  );
}

export default Offers;
