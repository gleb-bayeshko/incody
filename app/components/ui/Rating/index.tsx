import classNames from "classnames";
import { useEffect, useState } from "react";
import StarChecked from "~/components/icons/StarChecked";
import StarUnchecked from "~/components/icons/StarUnchecked";

interface RatingProps {
  rating?: number;
  interactive?: boolean;
  onSelect?: (selectedRating: number | null) => void;
}

function Rating({ rating = 0, interactive = false, onSelect }: RatingProps) {
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleSelect = (number: number) => {
    if (!interactive) return;

    setSelectedRating?.(number);
  };

  useEffect(() => {
    if (!interactive) return;

    onSelect?.(selectedRating);
  }, [selectedRating]);

  return (
    <div className="flex" onMouseLeave={() => setHoverRating(0)}>
      {[...Array(5).keys()].map((n) => {
        const StarElement = interactive
          ? hoverRating >= n + 1 || (selectedRating && selectedRating >= n + 1)
            ? StarChecked
            : StarUnchecked
          : rating >= n + 1
          ? StarChecked
          : StarUnchecked;
        return (
          <div
            key={n + 1}
            onMouseEnter={() => setHoverRating(n + 1)}
            className={classNames("mr-1", {
              "cursor-pointer": interactive,
            })}
            onClick={() => handleSelect(n + 1)}
          >
            <StarElement key={n + 1} />
          </div>
        );
      })}
    </div>
  );
}

export default Rating;
