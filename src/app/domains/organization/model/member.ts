import { Address } from './address';

export interface Member {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  emailVerified?: boolean;
  birthdate: Date | null;
  created?: Date;
  address?: Address;
}
