import * as React from "react";

const ProfileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={23}
    viewBox="0 0 20 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="10"
      cy="6"
      r="4.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <path
      d="M2 21C2 16.5817 5.58172 13 10 13C14.4183 13 18 16.5817 18 21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default ProfileIcon;