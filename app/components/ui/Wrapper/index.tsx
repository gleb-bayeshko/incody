import classNames from "classnames";
import type { PropsWithChildren } from "react";
import type { ClassNameProp } from "~/utils/types";

interface WrapperProps extends ClassNameProp {
  xPadding?: boolean;
}

function Wrapper({
  children,
  xPadding = true,
  className = "",
}: PropsWithChildren<WrapperProps>) {
  return (
    <div
      className={classNames("container mx-auto px-6", {
        "py-6": xPadding,
        [className]: !!className,
      })}
    >
      {children}
    </div>
  );
}

export default Wrapper;
