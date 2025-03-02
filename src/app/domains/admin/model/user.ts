import { Role } from './role';

export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  emailVerified?: boolean;
  roles: Role[];
  birthdate: Date | null;
  created?: Date;
}
