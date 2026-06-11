import * as React from "react";

const CartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="shinyCart" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="35%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="65%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    
    {/* Main cart outline */}
    <path
      d="M1 1H4L5.5 11H19L22 4H6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Cart body / items area */}
    <path
      d="M6 15H19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Wheels */}
    <circle
      cx="8"
      cy="20"
      r="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <circle
      cx="17"
      cy="20"
      r="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    
    {/* Shiny highlight line - diagonal across the cart */}
    <path
      d="M7 7 L12 4.5 L18 7"
      stroke="url(#shinyCart)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Subtle shine on the handle */}
    <path
      d="M3 2 L4.5 2.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
  </svg>
);

export default CartIcon;