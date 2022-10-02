export interface CartItemTypes {
  id?: number;
  name?: string;
  price: number;
  variation?: string;
  quantity: number;
  compositeId?: string;
}

export interface UserAuthParams {
  token?: string;
  name?: string;
  phone?: string;
  voucher?: Record<string, any>;
  cartItem: CartItemTypes[];
}

export interface UserInfoParams {
  token?: string;
  name?: string;
  phone?: string;
  voucher?: Record<string, any>;
}

export interface UserContextParams {
  token?: string;
  name?: string;
  voucher?: Record<string, any>;
  cartItem: CartItemTypes[];
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
