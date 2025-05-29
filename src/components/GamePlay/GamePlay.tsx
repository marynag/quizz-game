import React from "react";

import { useGame } from "@/context/GameContext";
import { QuestionCard } from "../QuestionCard/QuestionCard";
import { Loader } from "../common/Loader/Loader";

export const GamePlay = () => {
  const { gameState, gameConfig, selectAnswer, nextQuestion } = useGame();

  if (!gameConfig) {
    return <Loader />;
  }

  const currentQuestion = gameConfig.questions[gameState.currentQuestionIndex];

  return (
    <>
      <QuestionCard
        question={currentQuestion}
        questionNumber={gameState.currentQuestionIndex + 1}
        totalQuestions={gameConfig.questions.length}
        isAnswerRevealed={gameState.isAnswerRevealed}
        isCorrect={gameState.isCorrect}
        onAnswerSelect={selectAnswer}
        onNextQuestion={nextQuestion}
      />
    </>
  );
};
