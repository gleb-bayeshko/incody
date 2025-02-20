import classNames from "classnames";
import StarChecked from "~/components/icons/StarChecked";
import StarUnchecked from "~/components/icons/StarUnchecked";

interface RatingProps {
  rating?: number;
  interactive?: boolean;
  onSelect?: (selectedRating: number) => void;
}

function Rating({ rating = 0 }: RatingProps) {
  return (
    <div className="flex">
      {[...Array(5).keys()].map((n) =>
        rating >= n + 1 ? (
          <StarChecked key={n + 1} className="mr-1" />
        ) : (
          <StarUnchecked key={n + 1} className="mr-1" />
        )
      )}
    </div>
  );
}

export default Rating;
