"use client";
import { useGame } from "@/context/GameContext";
import { GameGreeting } from "../components/GameGreeting/GameGreeting";
import { PrizeList } from "@/components/PrizeList/PrizeList";
import { GameStatus } from "@/types";
import { GamePlay } from "@/components/GamePlay/GamePlay";
import styles from "./page.module.css";
import { BurgerMenu } from "@/components/BurgerMenu/BurgerMenu";
import { useEffect, useState } from "react";
import { GameFinish } from "@/components/GameFinish/GameFinish";

export default function Home() {
  const { gameState } = useGame();

  const isMobileCurrent =
    typeof window !== "undefined" && window.innerWidth < 768;

  const [isMobile, setIsMobile] = useState(isMobileCurrent);
  const [isPrizeListVisible, setIsPrizeListVisible] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768;
      setIsMobile(isMobileNow);
      setIsPrizeListVisible(!isMobileNow);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const changePrizeListVisibility = () => {
    setIsPrizeListVisible(!isPrizeListVisible);
  };

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
}
