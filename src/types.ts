export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string[];
  prize: string;
}

export interface GameConfig {
  questions: Question[];
}

export const GameStatus = {
  menu: "menu",
  playing: "playing",
  finished: "finished",
};

export interface GameState {
  currentQuestionIndex: number;
  totalPrize: number;
  gameStatus: (typeof GameStatus)[keyof typeof GameStatus];
  selectedAnswers: string[];
  isAnswerRevealed: boolean;
  isCorrect: boolean | null;
}
