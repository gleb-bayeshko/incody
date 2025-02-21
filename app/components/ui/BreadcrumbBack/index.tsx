import classNames from "classnames";
import { Link, useNavigate } from "react-router";
import ArrowLeft from "~/components/icons/ArrorLeft";
import type { ClassNameProp } from "~/utils/types";

interface BreadcrumbBackProps extends ClassNameProp {
  text: string;
  arrowVisible?: boolean;
  link?: string;
}

function BreadcrumbBack({
  className,
  text,
  link,
  arrowVisible = true,
}: BreadcrumbBackProps) {
  const navigate = useNavigate();

  let Elem;

  if (link) {
    Elem = Link;
  } else {
    Elem = "div";
  }

  return (
    <Elem
      to={link || ""}
      className={classNames(
        "flex items-center hover:contrast-20 duration-100 cursor-pointer",
        className
      )}
      onClick={!link ? () => navigate(-1) : undefined}
    >
      {arrowVisible && <ArrowLeft className="mr-3" />}
      <div className="text-gray-accent text-base font-light">{text}</div>
    </Elem>
  );
}

export default BreadcrumbBack;
