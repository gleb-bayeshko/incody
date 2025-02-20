import type { ClassNameProp } from "~/utils/types";

function StarChecked({ className }: ClassNameProp) {
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
        fill="#F7CE5B"
        stroke="#F7CE5B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        d="m10 1.667 2.575 5.216 5.758.842-4.166 4.058.983 5.734L10 14.808l-5.15 2.709.983-5.734-4.166-4.058 5.758-.842z"
      ></path>
    </svg>
  );
}

export default StarChecked;
