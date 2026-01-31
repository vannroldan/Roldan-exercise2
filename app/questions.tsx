// questions.ts
export type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

const questions: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: 2,
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correctAnswer: 3,
  },
];

export default questions;
