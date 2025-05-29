"use client";
import { useGame } from "@/context/GameContext";
import { PrizeList } from "@/components/PrizeList/PrizeList";
import { GameStatus } from "@/types";
import { GamePlay } from "@/components/GamePlay/GamePlay";
import styles from "./GameController.module.css";
import { BurgerMenu } from "@/components/BurgerMenu/BurgerMenu";
import { useEffect, useState } from "react";
import { GameFinish } from "@/components/GameFinish/GameFinish";
import { ErrorScreen } from "@/components/error/ErrorScreen";
import { GameGreeting } from "../GameGreeting/GameGreeting";

export const GameController = () => {
  const { gameState, error, gameConfig } = useGame();

  const isMobileCurrent =
    typeof window !== "undefined" && window.innerWidth < 1024;

  const [isMobile, setIsMobile] = useState(isMobileCurrent);
  const [isPrizeListVisible, setIsPrizeListVisible] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const isMobileNow = window.innerWidth < 1024;
      setIsMobile(isMobileNow);
      setIsPrizeListVisible(!isMobileNow);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const changePrizeListVisibility = () => {
    setIsPrizeListVisible(!isPrizeListVisible);
  };

  if (error) {
    return <ErrorScreen error={error} />;
  }

  if (!gameConfig) {
    return <ErrorScreen error="Game configuration not available" />;
  }

  switch (gameState.gameStatus) {
    case GameStatus.menu:
      return <GameGreeting />;
    case GameStatus.playing:
      return (
        <div className={styles.gameWrapper}>
          <BurgerMenu
            onClick={changePrizeListVisibility}
            isOpened={!isPrizeListVisible}
          />
          <GamePlay />
          {isPrizeListVisible && <PrizeList />}
        </div>
      );
    case GameStatus.finished:
      return <GameFinish />;
    default:
      return <GameGreeting />;
  }
};
