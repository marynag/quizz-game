"use client";
import React from "react";
import { Question } from "@/types";

import styles from "./QuestionCard.module.css";
import { OptionTemplate } from "../OptionTemplate/OptionTemplate";

type QuestionCardProps = {
  question: Question;
};

export const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <div className={styles.questionBg}>
      <h2 className={styles.questionHeader}> {question.question}</h2>
      <div className={styles.answersBox}>
        {question.options.map((option, index) => (
          <OptionTemplate key={index} text={option} number={index + 1} />
        ))}
      </div>
    </div>
  );
};
