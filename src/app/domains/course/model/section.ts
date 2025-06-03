import { Block } from './block';

export interface Section {
  id?: string;
  title: string;
  description: string;
  content: Block[];
}
