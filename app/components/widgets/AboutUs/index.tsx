import classNames from "classnames";
import type { ClassNameProp } from "~/utils/types";

interface AboutUsProps extends ClassNameProp {
  title?: string;
  description?: string;
}

function AboutUs({ description, title = "О нас", className }: AboutUsProps) {
  return (
    <section className={classNames(className)}>
      <h2 className="mb-6">{title}</h2>
      <p>{description}</p>
    </section>
  );
}

export default AboutUs;
