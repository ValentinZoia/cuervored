import React from "react";


interface CanchaProps {
    color?:string;
    width?:string;
    height?:string
    strokeWidth?:number
}

export default function Cancha({color,width,height,strokeWidth=1.5}:CanchaProps) {
  return (
    
<svg
      width={width}
      height={height}
      viewBox="0 0 24 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1.5" width="22" height="18" rx="1" stroke={color} strokeWidth={strokeWidth} />
      <line x1="12" y1="1.5" x2="12" y2="19.5" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="12" cy="10.5" r="2.5" stroke={color} strokeWidth={strokeWidth} />
      <rect x="1" y="4.5" width="3.5" height="12" stroke={color} strokeWidth={strokeWidth} />
      <rect x="19.5" y="4.5" width="3.5" height="12" stroke={color} strokeWidth={strokeWidth} />
    </svg>


  );
}
