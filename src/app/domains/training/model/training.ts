import { Interval } from './interval';
import { Lesson } from './lesson';

export interface Training {
  id?: string;
  name: string;
  description?: string;
  defaultInterval?: Interval | null;
  notes?: string;
  lessons: Lesson[];
  created?: Date;
}
