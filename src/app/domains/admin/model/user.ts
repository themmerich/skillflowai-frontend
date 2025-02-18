import { Role } from './role';
import { Address } from './address';

export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  emailVerified?: boolean;
  roles: Role[];
  birthdate: Date | null;
  created?: Date;
  address?: Address;
}
