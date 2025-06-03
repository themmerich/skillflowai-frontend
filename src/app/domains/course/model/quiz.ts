import { Question } from './question';

export interface Quiz {
  id?: string;
  timeLimit?: number;
  neededPointsToPass?: number;
  questions: Question[];
}
