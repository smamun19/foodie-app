export type Roles =
  | 'VENDOR'
  | 'USER'
  | 'PREMIUM'
  | 'ADMIN'
  | 'MODERATOR'
  | 'BANNED';

export interface CartItemTypes {
  id?: number;
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
  email?: string;
  voucher?: Record<string, any>;
  cartItem: CartItemTypes[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserContextParams {
  id?: string;
  roles?: Roles[];
  token?: string;
  name?: string;
  phone?: string;
  email?: string;
  voucher?: Record<string, any>;
  cartItem: CartItemTypes[];
  createdAt?: string;
  updatedAt?: string;
  iat?: string;
  exp?: string;
  login: (userData: UserAuthParams) => void;
  addVoucher: (userData: UserAuthParams) => void;
  removeVoucher: () => void;
  hydrate: (userData: UserAuthParams) => void;
  logout: () => void;
  addItem: (item: CartItemTypes) => void;
  removeItem: (item: CartItemTypes) => void;
}

export enum ActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ADD_VOUCHER = 'ADD_VOUCHER',
  REMOVE_VOUCHER = 'REMOVE_VOUCHER',
  ADD_TO_CARD = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  HYDRATE = 'HYDRATE',
}
export interface ActionParams {
  type: ActionType;
  payload?: UserAuthParams;
  item: CartItemTypes;
}
export interface ProviderProps {
  // any props that come into the component
}
