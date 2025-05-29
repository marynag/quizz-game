"use client";
import React from "react";
import Image from "next/image";
import styles from "./GameGreeting.module.css";

import { Button } from "../common/Button";
import handImage from "../../../public/images/hand.png";
import { useGame } from "@/context/GameContext";

export const GameGreeting = () => {
  const { startGame } = useGame();
  return (
    <div className={styles.bgGradient}>
      <div className={styles.greetingWrapper}>
        <div className={styles.imageWrapper}>
          <Image src={handImage} alt="Hand" className={styles.handImage} />
        </div>
        <div className={styles.headerWrapper}>
          <h1 className={styles.header}>Who wants to be a millionaire?</h1>
          <Button text={"Start"} onClick={startGame} />
        </div>
      </div>
    </div>
  );
};
