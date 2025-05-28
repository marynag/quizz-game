"use client";
import { useGame } from "@/context/GameContext";
import { GameGreeting } from "../components/GameGreeting/GameGreeting";
import { PrizeList } from "@/components/PrizeList/PrizeList";
import { GameStatus } from "@/types";
import { GamePlay } from "@/components/GamePlay/GamePlay";
import styles from "./page.module.css";

export default function Home() {
  const { gameState } = useGame();

  switch (gameState.gameStatus) {
    case GameStatus.menu:
      return <GameGreeting />;
    case GameStatus.playing:
      return (
        <div className={styles.gameWrapper}>
          <GamePlay />
          <PrizeList />
        </div>
      );
    case GameStatus.finished:
      return <p>finished</p>;
    default:
      return <p>finished</p>;
  }
}
