"use client";
import React from "react";
import Image from "next/image";
import styles from "./GameFinish.module.css";

import { Button } from "../common/Button";
import handImage from "../../../public/images/hand.png";
import { useGame } from "@/context/GameContext";

export const GameFinish = () => {
  const { gameState, restartGame } = useGame();
  return (
    <div className={styles.bgGradient}>
      <div className={styles.imageWrapper}>
        <Image src={handImage} alt="Hand" className={styles.handImage} />
      </div>
      <div className={styles.headerWrapper}>
        <div className={styles.resultScore}>
          <h3 className={styles.totalResult}>Total score:</h3>
          <h1 className={styles.header}>$ {gameState.totalPrize} earned </h1>
        </div>
        <Button text={"Start"} onClick={restartGame} />
      </div>
    </div>
  );
};
