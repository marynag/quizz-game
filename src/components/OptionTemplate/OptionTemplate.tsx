import React, { useEffect, useState } from "react";

type Props = {
  text: string;
  number: number;
};

export const OptionTemplate = ({ text, number }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const letter = String.fromCharCode(64 + number);

  return (
    <svg
      width="405"
      height="72"
      viewBox="0 0 405 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M388 36L405 36" stroke="#D0D0D8" />
      <path d="M0 36L17 36" stroke="#D0D0D8" />
      <path
        d="M48.0518 0.5H356.948C360.532 0.500071 363.904 2.17099 366.076 5.00586L366.283 5.2832L388.383 36L366.283 66.7168C364.122 69.72 360.648 71.4999 356.948 71.5H48.0518C44.3519 71.4999 40.8777 69.72 38.7168 66.7168L16.6162 36L38.7168 5.2832C40.8777 2.27998 44.3519 0.500068 48.0518 0.5Z"
        fill="white"
        stroke="#D0D0D8"
      />

      <text
        x="60"
        y="42"
        text-anchor="start"
        font-size={isMobile ? "14px" : "20px"}
        font-weight="600"
        fill="#FF8C42"
      >
        {letter}
      </text>
      <text
        x="85"
        y="42"
        text-anchor="start"
        font-size={isMobile ? "14px" : "20px"}
        font-weight="400"
        fill="#333333"
      >
        {text}
      </text>
    </svg>
  );
};
