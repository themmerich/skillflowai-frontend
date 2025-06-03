import { Section } from './section';

export interface Lesson {
  id?: string;
  title: string;
  description: string;
  content: Section[];
}
