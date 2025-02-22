import { Material } from './material';
import { Question } from './question';

export interface Training {
  id?: number;
  name: string;
  description?: string;
  interval?: string;
  materials?: Material[];
  questions?: Question[];
  numberOfQuestions?: number;
  numberOfCorrectQuestions?: number;
  notes?: string;
  created?: Date;
}
