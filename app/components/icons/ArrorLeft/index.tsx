import type { ClassNameProp } from "~/utils/types";

function ArrowLeft({ className }: ClassNameProp) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        stroke="#A2A2A2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        d="m12.5 15-5-5 5-5"
      ></path>
    </svg>
  );
}

export default ArrowLeft;
