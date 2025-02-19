import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { CategoryProps } from "./Category";
import type { ClassNameProp } from "~/utils/types";
import classNames from "classnames";

type CategoryId = CategoryProps[keyof Pick<CategoryProps, "id">];

interface CategoriesProps extends ClassNameProp {
  onChange?: (id: CategoryId | null) => void;
  defaultCategory?: string | number;
}

interface CategoriesContextType {
  onClick: (id: CategoryId) => void;
  currentCategory: CategoryId | null;
}

export const CategoriesContext = createContext<CategoriesContextType | null>(
  null
);

function Categories({
  children,
  onChange,
  className = "",
}: PropsWithChildren<CategoriesProps>) {
  const [currentCategory, setCurrentCategory] = useState<CategoryId | null>(
    null
  );

  const handleCategoryClick = (id: CategoryId) => {
    setCurrentCategory(id === currentCategory ? null : id);
  };

  useEffect(() => {
    onChange?.(currentCategory);
  }, [currentCategory]);

  return (
    <CategoriesContext.Provider
      value={{
        onClick: handleCategoryClick,
        currentCategory,
      }}
    >
      <div
        className={classNames("flex flex-wrap", { [className]: !!className })}
      >
        {children}
      </div>
    </CategoriesContext.Provider>
  );
}

export default Categories;
