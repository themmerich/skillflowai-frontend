import { Lesson } from './lesson';
import { Interval } from './interval';

export interface Course {
  id?: string;
  tenantId: string;
  title: string;
  description?: string;
  status: string;
  repeatInterval?: Interval;
  lessons: Lesson[];
  courseImage?: string;
  enrolledUsers: string[];
}
