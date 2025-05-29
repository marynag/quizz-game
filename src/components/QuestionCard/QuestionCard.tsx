"use client";
import React from "react";
import { Question } from "@/types";

import styles from "./QuestionCard.module.css";
import { OptionTemplate } from "../OptionTemplate/OptionTemplate";

type QuestionCardProps = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  isAnswerRevealed: boolean;
  isCorrect: boolean | null;
  onAnswerSelect: (answer: string) => void;
  onNextQuestion: () => void;
};

export const QuestionCard = ({
  question,
  isAnswerRevealed,
  onAnswerSelect,
}: QuestionCardProps) => {
  return (
    <div className={styles.questionBg}>
      <h2 className={styles.questionHeader}> {question.question}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"></div>
      <div className={styles.answersBox}>
        {question.options.map((option, index) => (
          <OptionTemplate
            key={index}
            text={option}
            number={index + 1}
            isCorrect={isAnswerRevealed && question.answer.includes(option)}
            onSelect={() => !isAnswerRevealed && onAnswerSelect(option)}
            disabled={isAnswerRevealed}
          />
        ))}
      </div>
    </div>
  );
};
