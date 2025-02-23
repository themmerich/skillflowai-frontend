import { Material } from './material';
import { Question } from './question';
import { Interval } from './interval';

export interface Training {
  id?: number;
  name: string;
  description?: string;
  interval?: Interval | null;
  materials?: Material[];
  questions?: Question[];
  numberOfQuestions?: number;
  numberOfCorrectQuestions?: number;
  notes?: string;
  created?: Date;
}
