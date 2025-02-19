import classNames from "classnames";
import type { ComponentType, InputHTMLAttributes } from "react";

interface InputTextProps
  extends Partial<InputHTMLAttributes<HTMLInputElement>> {
  labelClassName?: string;
  inputClassName?: string;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
}

function InputText({
  labelClassName = "",
  inputClassName = "",
  iconLeft: IconLeft,
  iconRight: IconRight,
  ...rest
}: InputTextProps) {
  return (
    <label
      className={classNames("input px-6 py-3 h-[48px] gap-3 ", {
        [labelClassName]: !!labelClassName,
      })}
    >
      {IconLeft}
      <input
        className={classNames("grow font-light text-base", {
          [inputClassName]: !!inputClassName,
        })}
        {...rest}
      />
      {IconRight}
    </label>
  );
}

export default InputText;
