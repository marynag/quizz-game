import React from "react";

import { useGame } from "@/context/GameContext";
import { QuestionCard } from "../QuestionCard/QuestionCard";

export const GamePlay = () => {
  const { gameState, gameConfig, selectAnswer, nextQuestion } = useGame();
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
