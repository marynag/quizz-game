"use client";

import React, { createContext, useContext, useState } from "react";

import quizData from "../gameConfig.json";
import { validateGameConfig } from "./GameContext.utils";
import { GameConfig, GameState, GameStatus } from "@/types";

interface GameContextProps {
  gameState: GameState;
  gameConfig: GameConfig;
  startGame: () => void;
  selectAnswer: (answer: string) => void;
  checkAnswer: (selectedAnswers: string[]) => void;
  nextQuestion: () => void;
  restartGame: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    totalPrize: 0,
    gameStatus: GameStatus.menu,
    selectedAnswers: [],
    isAnswerRevealed: false,
    isCorrect: null,
  });

  const gameConfig: GameConfig = quizData;

  validateGameConfig(gameConfig);

  const startGame = (): void => {
    setGameState({
      currentQuestionIndex: 0,
      totalPrize: 0,
      gameStatus: GameStatus.playing,
      selectedAnswers: [],
      isAnswerRevealed: false,
      isCorrect: null,
    });
  };

  const selectAnswer = (answer: string): void => {
    const currentQuestion =
      gameConfig.questions[gameState.currentQuestionIndex];
    const isMultipleChoice = currentQuestion.answer.length > 1;

    let newSelectedAnswers: string[];

    if (isMultipleChoice) {
      if (gameState.selectedAnswers.includes(answer)) {
        newSelectedAnswers = gameState.selectedAnswers.filter(
          (a) => a !== answer
        );
      } else {
        newSelectedAnswers = [...gameState.selectedAnswers, answer];
      }
    } else {
      newSelectedAnswers = [answer];
    }

    setGameState((prev) => ({
      ...prev,
      selectedAnswers: newSelectedAnswers,
    }));

    if (!isMultipleChoice) {
      setTimeout(() => {
        checkAnswer(newSelectedAnswers);
      }, 500);
    } else {
      if (
        newSelectedAnswers.length ===
        gameConfig.questions[gameState.currentQuestionIndex].answer.length
      ) {
        setTimeout(() => {
          checkAnswer(newSelectedAnswers);
        }, 500);
      }
    }
  };

  const nextQuestion = (): void => {
    if (
      !gameConfig ||
      gameState.currentQuestionIndex >= gameConfig.questions.length - 1
    ) {
      return;
    }

    setGameState((prev) => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      selectedAnswers: [],
      isAnswerRevealed: false,
      isCorrect: null,
    }));
  };

  const checkAnswer = (selectedAnswers: string[]): void => {
    if (!gameConfig) return;

    const currentQuestion =
      gameConfig.questions[gameState.currentQuestionIndex];
    const isCorrect =
      selectedAnswers.length === currentQuestion.answer.length &&
      selectedAnswers.every((answer) =>
        currentQuestion.answer.includes(answer)
      );

    const newTotalPrize = isCorrect
      ? gameState.totalPrize + parseInt(currentQuestion.prize)
      : gameState.totalPrize;

    setGameState((prev) => ({
      ...prev,
      isAnswerRevealed: true,
      isCorrect,
      totalPrize: newTotalPrize,
      gameStatus:
        !isCorrect ||
        prev.currentQuestionIndex === gameConfig.questions.length - 1
          ? GameStatus.finished
          : GameStatus.playing,
    }));
    nextQuestion();
  };

  const restartGame = (): void => {
    setGameState({
      currentQuestionIndex: 0,
      totalPrize: 0,
      gameStatus: GameStatus.menu,
      selectedAnswers: [],
      isAnswerRevealed: false,
      isCorrect: null,
    });
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        gameConfig,
        startGame,
        selectAnswer,
        checkAnswer,
        nextQuestion,
        restartGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
