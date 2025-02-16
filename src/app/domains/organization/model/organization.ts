import { Address } from '../../../shared/model/address';

export interface Organization {
  id?: number;
  name: string;
  notes?: string;
  members?: number;
  address: Address;
  email?: string;
  phone?: string;
  logo?: string;
  website?: string;
  created?: Date;
}
