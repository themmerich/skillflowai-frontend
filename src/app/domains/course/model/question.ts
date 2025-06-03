import { Answer } from './answer';

export interface Question {
  id?: string;
  question: string;
  answers: Answer[];
  points: number;
}
