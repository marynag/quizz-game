import React, { useEffect, useState } from "react";
import styles from "./OptionTemplate.module.css";
import { useGame } from "@/context/GameContext";
import { COLORS } from "../constants/colors";

type Props = {
  text: string;
  number: number;
  onSelect?: (option: string) => void;
  isCorrect: boolean;
  disabled?: boolean;
};

export const OptionTemplate = ({
  text,
  number,
  onSelect,
  disabled,
  isCorrect,
}: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const { gameState } = useGame();

  const { selectedAnswers } = gameState;
  const isSelected = selectedAnswers.includes(text);
  const isWrong = isSelected && !isCorrect;

  const isAnswerRevealed = gameState.isAnswerRevealed;

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const letter = String.fromCharCode(64 + number);

  let baseColorLine = isSelected ? COLORS.orangePrimary : COLORS.greyInactive;
  let baseColorBg = isSelected ? COLORS.orangeFade : COLORS.white;

  if (isCorrect && isSelected) {
    baseColorLine = COLORS.greenPrimary;
    baseColorBg = COLORS.greenFade;
  }

  if (isWrong && isAnswerRevealed && isSelected) {
    baseColorLine = COLORS.redPrimary;
    baseColorBg = COLORS.redFade;
  }

  return (
    <button
      onClick={() => onSelect && onSelect(text)}
      className={styles.buttonInvisible}
      disabled={disabled}
    >
      <svg
        width="405"
        height="72"
        viewBox="0 0 405 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M388 36L405 36" stroke={baseColorLine} />
        <path d="M0 36L17 36" stroke={baseColorLine} />
        <path
          d="M48.0518 0.5H356.948C360.532 0.500071 363.904 2.17099 366.076 5.00586L366.283 5.2832L388.383 36L366.283 66.7168C364.122 69.72 360.648 71.4999 356.948 71.5H48.0518C44.3519 71.4999 40.8777 69.72 38.7168 66.7168L16.6162 36L38.7168 5.2832C40.8777 2.27998 44.3519 0.500068 48.0518 0.5Z"
          fill={baseColorBg}
          stroke={baseColorLine}
          className={styles.SVGhover}
        />

        <text
          x="60"
          y="42"
          text-anchor="start"
          font-size={isMobile ? "14px" : "20px"}
          font-weight="600"
          fill={COLORS.orangePrimary}
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
    </button>
  );
};
