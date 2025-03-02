import { Material } from './material';

export interface Lesson {
  id?: string;
  name: string;
  description: string;
  notes?: string;
  materials: Material[];
}
