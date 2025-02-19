import type { ClassNameProp } from "~/utils/types";

function SearchIcon({ className }: ClassNameProp) {
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
        d="m17.5 17.5-3.583-3.583m1.916-4.75a6.667 6.667 0 1 1-13.333 0 6.667 6.667 0 0 1 13.333 0"
      ></path>
    </svg>
  );
}

export default SearchIcon;
