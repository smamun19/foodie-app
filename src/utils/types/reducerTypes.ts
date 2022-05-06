export interface CartItemTypes {
  id: string;
  name: string;
}

export interface UserAuthParams {
  token?: string;
  name?: string;
  cartItem: CartItemTypes[];
}

export interface ValueTypes {
  token?: string;
  name?: string;
  cartItem: CartItemTypes[];
  login: (userData: UserAuthParams) => void;
  hydrate: (userData: UserAuthParams) => void;
  logout: () => void;
  addItem: (item: CartItemTypes) => void;
}

export enum ActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ADD_TO_CARD = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  HYDRATE = 'HYDRATE',
}

export interface ActionParams {
  type: ActionType;
  payload?: UserAuthParams;
  item?: CartItemTypes;
}

export interface ProviderProps {
  // any props that come into the component
}
