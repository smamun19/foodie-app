import {Roles} from './reducerTypes';

export interface User {
  id?: string;
  roles?: Roles[];
  token?: string;
  name?: string;
  phone?: string;
  email?: string;
  voucher?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Voucher {
  id: number;
  name: string;
  value: number;
  isActive: boolean;
  details?: string;
  createdAt: string;
  updatedAt: string;
}
