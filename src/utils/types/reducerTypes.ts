import {Address, Voucher} from './user';

export type Roles =
  | 'VENDOR'
  | 'USER'
  | 'PREMIUM'
  | 'ADMIN'
  | 'MODERATOR'
  | 'BANNED';

export interface CartItemTypes {
  itemId?: number;
  name?: string;
  price: number;
  variation?: string;
  quantity: number;
  compositeId?: string;
}

export interface UserAuthParams {
  id?: string;
  roles?: Roles[];
  token?: string;
  name?: string;
  phone?: string;
  restaurantId?: string;
  currentOrderId?: string;
  address: Address[];
  email?: string;
  voucher?: Voucher;
  cartItem: CartItemTypes[];
  darkMode?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserContextParams {
  id?: string;
  roles?: Roles[];
  token?: string;
  name?: string;
  phone?: string;
  restaurantId?: string;
  currentOrderId?: string;
  address: Address[];
  email?: string;
  voucher?: Voucher;
  cartItem: CartItemTypes[];
  darkMode?: boolean;
  createdAt?: string;
  updatedAt?: string;
  iat?: string;
  exp?: string;
  login: (userData: UserAuthParams) => void;
  addVoucher: (userData: UserAuthParams) => void;
  removeVoucher: () => void;
  hydrate: (userData: UserAuthParams) => void;
  logout: () => void;
  addItem: (item: CartItemTypes, restaurantId?: string) => void;
  removeItem: (item: CartItemTypes) => void;
}

export enum ActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ADD_VOUCHER = 'ADD_VOUCHER',
  REMOVE_VOUCHER = 'REMOVE_VOUCHER',
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  HYDRATE = 'HYDRATE',
}
export interface ActionParams {
  type: ActionType;
  payload?: UserAuthParams;
  item: CartItemTypes;
  restaurantId?: string;
}
export interface ProviderProps {
  // any props that come into the component
}
