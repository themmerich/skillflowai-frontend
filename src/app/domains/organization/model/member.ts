import { Address } from './address';

export interface Member {
  id?: number;
  title?: string;
  firstname: string;
  lastname: string;
  email: string;
  emailVerified?: boolean;
  phonePrivate?: string;
  phoneWork?: string;
  mobile?: string;
  birthdate: Date | null;
  created?: Date;
  address?: Address;
}
