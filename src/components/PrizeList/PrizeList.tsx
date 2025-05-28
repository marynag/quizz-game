import React from "react";
import styles from "./PrizeList.module.css";
import { GameConfig } from "@/types";

import quizData from "../../gameConfig.json";
import { PrizeStep } from "../PrizeStep/PrizeStep";

export const PrizeList = () => {
  const gameConfig: GameConfig = quizData;
  
  return (
    <div className={styles.prizeList}>
      <ul className={styles.prizeListPoint}>
        {gameConfig.questions
          .slice()
          .reverse()
          .map((question, index) => {
            return <PrizeStep key={index} isCurrent={false} isCompleted={false} prize={question.prize}></PrizeStep>;
          })}
      </ul>
    </div>
  );
};
