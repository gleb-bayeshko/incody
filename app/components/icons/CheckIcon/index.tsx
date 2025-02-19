import type { ClassNameProp } from "~/utils/types";

function CheckIcon({ className }: ClassNameProp) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <rect width="24" height="24" fill="#53DD6C" rx="12"></rect>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        d="M18.667 7 9.5 16.167 5.333 12"
      ></path>
    </svg>
  );
}

export default CheckIcon;
