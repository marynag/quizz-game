import { GameConfig } from "@/types";

export const validateGameConfig = (config: GameConfig): void => {
  if (!Array.isArray(config.questions)) {
    throw new Error("Wrong format for questions in game config");
  }

  if (config.questions.length === 0) {
    throw new Error("Game config must contain at least one question");
  }

  config.questions.forEach((question, index) => {
    if (
      !question.question ||
      !question.options ||
      !question.answer ||
      !question.prize
    ) {
      throw new Error(`Question ${index + 1} is missing required fields`);
    }

    if (question.options.length < 2) {
      throw new Error(`Question ${index + 1} must have at least two options`);
    }

    if (question.answer.length === 0) {
      throw new Error(
        `Question ${index + 1} must have at least one correct answer`
      );
    }

    question.answer.forEach((answer) => {
      if (!question.options.includes(answer)) {
        throw new Error(
          `Correct answer "${answer}" is not found in question ${index + 1}`
        );
      }
    });
  });
};
