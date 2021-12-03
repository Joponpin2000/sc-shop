import * as React from "react";

function SvgComponent(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 8 8" fill="none" {...props}>
      <circle cx={4} cy={4} r={4} fill="#159B3B" />
      <path
        d="M3.11 5.085l2.876-2.876a.333.333 0 01.504.434l-.032.037-3.112 3.111a.333.333 0 01-.433.033l-.038-.033-1.333-1.333a.333.333 0 01.434-.504l.037.033 1.098 1.098z"
        fill="#FCFCFC"
      />
    </svg>
  );
}

export default SvgComponent;
