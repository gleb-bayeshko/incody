import classNames from "classnames";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps
  extends Partial<TextareaHTMLAttributes<HTMLTextAreaElement>> {
  className?: string;
}

function Textarea({ className, ...rest }: TextareaProps) {
  return (
    <textarea
      {...rest}
      className={classNames("textarea px-6 py-3 text-base", className)}
    ></textarea>
  );
}

export default Textarea;
