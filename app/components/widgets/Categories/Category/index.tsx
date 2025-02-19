import { useContext, type PropsWithChildren } from "react";
import { CategoriesContext } from "..";
import classNames from "classnames";
import CheckIcon from "~/components/icons/CheckIcon";

export interface CategoryProps {
  id: string | number;
}

function Category({ id, children }: PropsWithChildren<CategoryProps>) {
  const categoriesContext = useContext(CategoriesContext);

  const handleClick = () => {
    categoriesContext?.onClick(id);
  };

  const isSelected =
    categoriesContext?.currentCategory !== null &&
    id === categoriesContext?.currentCategory;

  return (
    <button
      className={classNames(
        "btn btn-outline mr-1 sm:mr-3 mb-1 sm:mb-3 font-light text-base border-[1px] flex gap-0 items-center justify-start",
        {
          "btn-outline-active pl-3 pr-6": isSelected,
          "px-6": !isSelected,
        }
      )}
      data-id={id}
      onClick={handleClick}
    >
      <CheckIcon
        className={classNames("w-0 h-0 duration-100", {
          "mr-3 w-6 h-6": isSelected,
        })}
      />
      {children}
    </button>
  );
}

export default Category;
