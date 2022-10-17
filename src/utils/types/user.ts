import {Roles} from './reducerTypes';

export interface User {
  id: string;
  roles: Roles[];
  token: string;
  name: string;
  phone?: string;
  email: string;
  address: Address[];
  voucher?: Voucher;
  createdAt: string;
  updatedAt: string;
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

export interface Address {
  id: number;
  name: string;
  details: string;
  label?: string;
  lat: number;
  long: number;
  extDetails?: string;
  deliveryInstructions?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GeoLocation {
  country: string;
  state: string;
  formattedAddress: string;
}

export interface HelpCenter {
  id: number;
  title: string;
  icon?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface HelpCenterQuery {
  id: number;
  title: string;
  icon?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  query?: HelpCenter[];
}
