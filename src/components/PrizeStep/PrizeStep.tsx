"use client";
import React, { useEffect, useState } from "react";
import styles from "./PrizeStep.module.css";

type PrizeStepProps = {
  isCurrent: boolean;
  isCompleted: boolean;
  prize: string;
};

export const PrizeStep = ({
  prize,
  isCurrent,
  isCompleted,
}: PrizeStepProps) => {
  const [isMobile, setIsMobile] = useState(false);

  const colorLine = isCurrent ? "#FF8B37" : "#D0D0D8";
  let textColor = !isCompleted ? "#D0D0D8" : "#1C1C21";

  if (isCurrent) {
    textColor = "#FF8B37";
  }

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <svg
      width="376"
      height="40"
      viewBox="0 0 376 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.prizeStep}
    >
      <path d="M69 20H0" stroke={colorLine} />
      <path d="M376 20H307" stroke={colorLine} />
      <path
        d="M90.2871 0.5H285.713C289.019 0.500018 292.16 1.92272 294.34 4.39551L294.548 4.6377L307.349 20L294.548 35.3623C292.363 37.9842 289.126 39.5 285.713 39.5H90.2871C86.9807 39.5 83.8397 38.0773 81.6602 35.6045L81.4521 35.3623L68.6504 20L81.4521 4.6377C83.6371 2.0158 86.8742 0.500017 90.2871 0.5Z"
        fill="white"
        stroke={colorLine}
      />
      <text
        x="188"
        y="26"
        textAnchor="middle"
        fontSize={isMobile ? "14px" : "20px"}
        fontWeight="400"
        fill={textColor}
      >
        ${prize}
      </text>
    </svg>
  );
};
