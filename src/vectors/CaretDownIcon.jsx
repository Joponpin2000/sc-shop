import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width=".5em"
      height=".5em"
      viewBox="0 0 8 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 .5l3 3 3-3"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
