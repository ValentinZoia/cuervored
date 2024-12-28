import React from "react";

import Image from "next/image";
export default function CuervoLogo() {
  return (
    <>
      {/* <svg
        className="hidden md:block"
        version="1.1"
        viewBox="0 0 2048 512"
        width="200"
        height="50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          transform="translate(441,72)"
          d="m0 0h17l16 5 11 7 8 8 9 17 8 16 7 10 5 3 16 5 16 8 13 11 7 7 7 8 9 10 10 13 12 20 15 15 8 7 12 12 9 11 8 10 5 9-2 4-3 2v2l6 5 7 14-1 7-3 2v2l5 5 10 13 13 17 10 13 14 19 7 13 1 4v10l-3 2-11-10-19-14-17-12-5-2 6 9 12 25 3 11v9l-2 3h-7l-7-6-5-7-3-7-2 3h-8l-11-4-11-7-10-10-10-14-11-19-10-20-4-4-1 4-1 2-4-1-8-7-10-10-5-6 1 17-4-2-7-15-1-4-1 1v20l-1 17-3 6-7 6-10 16-10 15-5 10h8l4 5 2 3 16 1 6 5 1 7-4-5-2-2-9-1v5l-2 1-10-3-13-1-14 2-27 8-5 1v-7l-11 4-5 2 5-5 11-6-9 2-3 2-3-1v-6l-13 5-3 2 2-4 6-4 9-2-4-2-9 2-5 3 2-4 8-5 30-3 6-2 8-7 8-13 14-25 2-3-1-5-6-18-9-32-11-9-15-14-11-12-12-16-9-14-10-18-7-16-3-13v-60l-6-9-6-4-3-1-62-1 1-5 6-8 9-8 11-5 14-3 24-5 11-6 10-4zm154 268m-66 24-22 33-4 7 1 5 5 2 6-9 16-29 1-2v-6zm147 14m-156 35-1 4 5 3h9l-4-6zm-25 4-9 2v1l14-1 2-2z"
          fill="#FF0000"
        />
        <path
          transform="translate(457,178)"
          d="m0 0 3 3 4 8 7 10 12 18 11 12 6 5 4 1-6-10-1-2 5 2 13 10 4 2v-2l6-1 13 7-3-9h2l1-2 10 9 11 7 5 1-2-6-5-10-1-5 5 1 13 15 10 5 4 1-1-7-10-16-4-5v-2h5l10 9 3 2-4-7v-3h7l12 14 5 7 3 13 10 7 13 9 16 13 9 8 2 4 5 7 1 3v7l-5-2-16-11-15-13-9-9-7-8-9-10-2-1 6 9 15 16 6 6v2h2l4 5 11 9 10 9 8 7-1 3h-6l-16-8-14-11-14-9-11-9-10-9-4-2 3 5 7 7v2l4 2 9 9 15 10 13 8 15 8 7 4 6 7v5l-1 1-12-1-19-8-15-7-7-3-11-7-11-10-11-9-11-10 4 5 5 5 9 10 8 10 13 13-4 2-20-13-23-16-16-11-25-14-14-12-3 3-10-11-13-17-11-15-10-17-6-16-2-10z"
          fill="#FF2D2D"
        />
        <path
          transform="translate(1305,172)"
          d="m0 0h60l11 4 10 8 6 9 3 8v18l-6 12-7 8-9 6 6 11 15 26 6 11h-23l-15-27-9-16v-2h-29v45h-19zm19 18v39l1 1h33l9-2 5-4 4-7v-13l-4-7-6-5-6-2z"
          fill="#d94a3d"
        />
        <path
          transform="translate(1591,165)"
          d="m0 0h18v128h-18l-1-10-11 8-11 4h-15l-11-4-9-6-7-8-6-12-2-9v-17l4-13 5-9 6-7 11-7 11-3h12l10 3 11 7 2 2zm-34 51-10 5-6 7-4 8-1 5v13l3 10 6 8 6 5 5 2 11 1 10-3 9-8 4-8 2-9-1-14-4-10-6-7-10-5z"
          fill="#d94a3d"
        />
        <path
          transform="translate(743,171)"
          d="m0 0h21l13 4 10 6 10 9-2 5-8 8-1 2h-2l-5-5-11-7-6-2h-18l-12 5-9 8-6 10-3 11v16l3 11 6 10 8 7 8 4 8 2h17l10-4 10-7 4 2 7 12-5 5-9 6-15 5-5 1h-18l-12-3-10-5-10-8-8-10-5-11-4-15v-21l5-16 6-11 9-10 10-7 14-6z"
          fill="#d94a3d"
        />
        <path
          transform="translate(955,200)"
          d="m0 0h14l10 3 10 6 8 9 5 11 2 12v11h-70l4 12 7 8 7 4 9 2h11l9-3 8-6h3l7 11v3l-10 6-12 5-5 1h-17l-13-4-10-6-7-7-7-14-2-8v-15l3-12 5-10 6-7 10-7 10-3h12l10 3 11 7 2 2zm-1 17-10 4-7 8-2 5v4h50l1-2-3-9-5-5-6-4-3-1z"
          fill="#d94a3d"
        />
        <path
          transform="translate(1455,200)"
          d="m0 0h14l10 3 11 7 8 10 4 9 2 14v9h-70l4 12 7 8 7 4 9 2h11l9-3 8-6 4 2 6 9v3l-14 8-13 4h-17l-13-4-9-5-8-8-5-8-4-14v-15l3-12 5-10 7-8 11-7zm-1 17-10 4-7 8-2 5v4h50l1-2-3-8-7-8-7-3z"
          fill="#d94a3d"
        />
        <path
          transform="translate(1228,200)"
          d="m0 0h12l12 3 10 6 8 7 6 9 4 13v20l-4 12-7 10-9 8-10 5-8 2h-16l-13-4-9-6-7-7-6-11-3-10v-19l3-10 5-9 8-9 12-7zm-2 17-8 4-7 7-4 7-1 4v17l4 10 4 5 9 6 7 2h9l10-4 5-4 6-9 2-6v-17l-4-10-8-8-8-4z"
          fill="#d94a3d"
        />
        <path
          transform="translate(816,202)"
          d="m0 0h18l1 55 2 10 6 8 5 3h15l6-3 5-5 3-5 1-62 1-1h17l1 1v90h-19v-12l-10 9-8 4-5 1h-14l-9-4-6-4-7-11-2-7-1-10z"
          fill="#d94a3d"
        />
        <path
          transform="translate(1085,202)"
          d="m0 0h20l12 31 12 29 2 4 17-40 9-22 2-2h18l-2 5-18 41-17 38-3 7h-14l-17-40-19-45z"
          fill="#d94a3d"
        />
        <path
          transform="translate(1065,200)"
          d="m0 0h9l5 2-1 7-3 12-13-1-9 3-5 4-4 6-2 9-1 51h-18v-91h18l1 11 1 3 7-8 5-4z"
          fill="#d94a3d"
        />
        <path
          transform="translate(633,350)"
          d="m0 0 6 2 17 10 12 8 7 6 2 2 7 11 12 25 3 11v9l-2 3h-7l-7-6-5-7-5-10v-3l-3-1-12-20-15-23-10-15z"
          fill="#b53b34"
        />
        <path
          transform="translate(593,211)"
          d="m0 0 9 3 8 7 11 12 8 7 14 15 8 7 2 2-1 4-11-8-13-10-8-7-13-12-12-12-2-5z"
          fill="#d94a3d"
        />
        <path
          transform="translate(675,379)"
          d="m0 0 4 2 6 10 11 23 3 11v9l-2 3h-7l-7-6-5-7-2-4v-6l1 2 4 2 4 9 5 6 6-1-2-12-3-9-9-17-9-12z"
          fill="#9d2c2c"
        />
        <path
          transform="translate(398,104)"
          d="m0 0h17l8 1v2l-30 2-23 4-15 1-1-2 12-3 13-3z"
          fill="#c93e36"
        />
        <path
          transform="translate(675,379)"
          d="m0 0 4 2 6 10 10 21-1 2-4-5-8-15-9-12z"
          fill="#9a2c2c"
        />
        <path
          transform="translate(452,420)"
          d="m0 0h6l-1 2-13 5-3 2 2-4 6-4z"
          fill="#d94a3d"
        />
        <path
          transform="translate(468,427)"
          d="m0 0 3 1-3 3-10 5-2-1 8-6z"
          fill="#9c2e2d"
        />
        <path
          transform="translate(521,411)"
          d="m0 0h8l4 5-2 2-2-3-9-2z"
          fill="#d94a3d"
        />
        <path
          transform="translate(438,88)"
          d="m0 0 5 1 1 6-5-2z"
          fill="#8f2a29"
        />
      </svg> */}
      <svg
        className=""
        version="1.1"
        viewBox="0 0 277 512"
        width="50"
        height="50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          transform="translate(43,72)"
          d="m0 0h17l16 5 11 7 8 8 9 17 8 16 7 10 5 3 16 5 16 8 13 11 7 7 7 8 9 10 10 13 12 20 15 15 8 7 12 12 9 11 8 10 5 9-2 4-3 2v2l6 5 7 14-1 7-3 2v2l5 5 10 13 13 17 10 13 14 19 7 13 1 4v10l-3 2-11-10-19-14-17-12-5-2 6 9 12 25 3 11v9l-2 3h-7l-7-6-5-7-3-7-2 3h-8l-11-4-11-7-10-10-10-14-11-19-10-20-4-4-1 4-1 2-4-1-8-7-10-10-5-6 1 17-4-2-7-15-1-4-1 1v20l-1 17-3 6-7 6-10 16-10 15-5 10h8l4 5 2 3 16 1 6 5 1 7-4-5-2-2-9-1v5l-2 1-10-3-13-1-14 2-27 8-5 1v-7l-11 4-5 2 5-5 11-6-9 2-3 2-3-1v-6l-13 5-3 2 2-4 6-4 9-2-4-2-9 2-5 3 2-4 8-5 30-3 6-2 8-7 8-13 14-25 2-3-1-5-6-18-9-32-11-9-15-14-11-12-12-16-9-14-10-18-7-16-3-13v-60l-6-9-6-4-3-1-62-1 1-5 6-8 9-8 11-5 14-3 24-5 11-6 10-4zm154 268m-66 24-22 33-4 7 1 5 5 2 6-9 16-29 1-2v-6zm147 14m-156 35-1 4 5 3h9l-4-6zm-25 4-9 2v1l14-1 2-2z"
          fill="#FF0000"
        />
        <path
          transform="translate(59,178)"
          d="m0 0 3 3 4 8 7 10 12 18 11 12 6 5 4 1-6-10-1-2 5 2 13 10 4 2v-2l6-1 13 7-3-9h2l1-2 10 9 11 7 5 1-2-6-5-10-1-5 5 1 13 15 10 5 4 1-1-7-10-16-4-5v-2h5l10 9 3 2-4-7v-3h7l12 14 5 7 3 13 10 7 13 9 16 13 9 8 2 4 5 7 1 3v7l-5-2-16-11-15-13-9-9-7-8-9-10-2-1 6 9 15 16 6 6v2h2l4 5 11 9 10 9 8 7-1 3h-6l-16-8-14-11-14-9-11-9-10-9-4-2 3 5 7 7v2l4 2 9 9 15 10 13 8 15 8 7 4 6 7v5l-1 1-12-1-19-8-15-7-7-3-11-7-11-10-11-9-11-10 4 5 5 5 9 10 8 10 13 13-4 2-20-13-23-16-16-11-25-14-14-12-3 3-10-11-13-17-11-15-10-17-6-16-2-10z"
          fill="#FF2D2D"
        />

        <path
          transform="translate(235,350)"
          d="m0 0 6 2 17 10 12 8 7 6 2 2 7 11 12 25 3 11v9l-2 3h-7l-7-6-5-7-5-10v-3l-3-1-12-20-15-23-10-15z"
          fill="#b53b34"
        />
        <path
          transform="translate(195,211)"
          d="m0 0 9 3 8 7 11 12 8 7 14 15 8 7 2 2-1 4-11-8-13-10-8-7-13-12-12-12-2-5z"
          fill="#d94a3d"
        />
        <path
          transform="translate(277,379)"
          d="m0 0 4 2 6 10 11 23 3 11v9l-2 3h-7l-7-6-5-7-2-4v-6l1 2 4 2 4 9 5 6 6-1-2-12-3-9-9-17-9-12z"
          fill="#9d2c2c"
        />
        <path
          transform="translate(0,104)"
          d="m0 0h17l8 1v2l-30 2-23 4-15 1-1-2 12-3 13-3z"
          fill="#c93e36"
        />
        <path
          transform="translate(277,379)"
          d="m0 0 4 2 6 10 10 21-1 2-4-5-8-15-9-12z"
          fill="#9a2c2c"
        />
        <path
          transform="translate(54,420)"
          d="m0 0h6l-1 2-13 5-3 2 2-4 6-4z"
          fill="#d94a3d"
        />
        <path
          transform="translate(70,427)"
          d="m0 0 3 1-3 3-10 5-2-1 8-6z"
          fill="#9c2e2d"
        />
        <path
          transform="translate(123,411)"
          d="m0 0h8l4 5-2 2-2-3-9-2z"
          fill="#d94a3d"
        />
        <path
          transform="translate(40,88)"
          d="m0 0 5 1 1 6-5-2z"
          fill="#8f2a29"
        />
      </svg>
    </>
  );
}
