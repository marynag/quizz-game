import React from "react";
import styles from "./PrizeList.module.css";

import { PrizeStep } from "../PrizeStep/PrizeStep";
import { useGame } from "@/context/GameContext";

export const PrizeList = () => {
  const { gameState, gameConfig } = useGame();

  return (
    <div className={styles.prizeList}>
      <ul className={styles.prizeListPoint}>
        {gameConfig.questions
          .slice()
          .reverse()
          .map((question, index) => {
            const isWon =
              index <
              gameConfig.questions.length - gameState.currentQuestionIndex - 1;
            const isLost = gameState.isAnswerRevealed && !gameState.isCorrect;
            const isCurrent =
              index ===
              gameConfig.questions.length - gameState.currentQuestionIndex - 1;

            return (
              <PrizeStep
                key={index}
                isCurrent={isCurrent}
                isCompleted={isWon || isLost}
                prize={question.prize}
              ></PrizeStep>
            );
          })}
      </ul>
    </div>
  );
};
