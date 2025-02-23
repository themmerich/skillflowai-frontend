import { Material } from './material';
import { Question } from './question';
import { Interval } from './interval';

export interface Training {
  id?: number;
  name: string;
  description?: string;
  interval?: Interval | null;
  materials: Material[];
  questions?: Question[];
  numberOfQuestions?: number | null;
  numberOfCorrectQuestions?: number | null;
  notes?: string;
  created?: Date;
}
