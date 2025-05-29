"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

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
  error: string | null;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    totalPrize: 0,
    gameStatus: GameStatus.menu,
    selectedAnswers: [],
    isAnswerRevealed: false,
    isCorrect: null,
  });

  let gameConfig: GameConfig;

  try {
    gameConfig = quizData;
    validateGameConfig(gameConfig);
  } catch (err) {
    console.log(err);
    const errorMessage =
      err instanceof Error ? err.message : "Game configuration error";
    router.push(`/error?message=${encodeURIComponent(errorMessage)}`);
    gameConfig = {
      questions: [],
    };
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    router.push(`/error?message=${encodeURIComponent(errorMessage)}`);
  };

  const startGame = (): void => {
    try {
      setGameState({
        currentQuestionIndex: 0,
        totalPrize: 0,
        gameStatus: GameStatus.playing,
        selectedAnswers: [],
        isAnswerRevealed: false,
        isCorrect: null,
      });
      setError(null);
    } catch (err) {
      console.log(err);
      handleError("Failed to start game");
    }
  };

  const selectAnswer = (answer: string): void => {
    try {
      const currentQuestion =
        gameConfig.questions[gameState.currentQuestionIndex];

      if (!currentQuestion) {
        throw new Error("Question not found");
      }

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
        if (newSelectedAnswers.length === currentQuestion.answer.length) {
          setTimeout(() => {
            checkAnswer(newSelectedAnswers);
          }, 500);
        }
      }
    } catch (err) {
      console.log(err);
      handleError("Failed to select answer");
    }
  };

  const nextQuestion = (): void => {
    try {
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
    } catch (err) {
      console.log(err);

      handleError("Failed to load next question");
    }
  };

  const checkAnswer = (selectedAnswers: string[]): void => {
    try {
      if (!gameConfig) {
        throw new Error("Game config not available");
      }

      const currentQuestion =
        gameConfig.questions[gameState.currentQuestionIndex];

      if (!currentQuestion) {
        throw new Error("Current question not found");
      }

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
      }));

      setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          gameStatus:
            !isCorrect ||
            prev.currentQuestionIndex === gameConfig.questions.length - 1
              ? GameStatus.finished
              : GameStatus.playing,
        }));

        nextQuestion();
      }, 1000);
    } catch (err) {
      console.log(err);
      handleError("Failed to check answer");
    }
  };

  const restartGame = (): void => {
    try {
      setGameState({
        currentQuestionIndex: 0,
        totalPrize: 0,
        gameStatus: GameStatus.menu,
        selectedAnswers: [],
        isAnswerRevealed: false,
        isCorrect: null,
      });
      setError(null);
    } catch (err) {
      console.log(err);
      handleError("Failed to restart game");
    }
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
        error,
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
