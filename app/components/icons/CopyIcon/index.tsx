import type { ClassNameProp } from "~/utils/types";

function CopyIcon({ className }: ClassNameProp) {
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
        stroke="#53DD6C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        d="M3.333 13.333c-.917 0-1.666-.75-1.666-1.666V3.333c0-.916.75-1.666 1.666-1.666h8.334c.916 0 1.666.75 1.666 1.666m-5 3.334h8.333c.921 0 1.667.746 1.667 1.666v8.334c0 .92-.746 1.666-1.666 1.666H8.333c-.92 0-1.666-.746-1.666-1.666V8.333c0-.92.746-1.666 1.666-1.666"
      ></path>
    </svg>
  );
}

export default CopyIcon;
