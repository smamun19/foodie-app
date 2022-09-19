import React, {FC, useEffect} from 'react';
import {createContext, useReducer} from 'react';
import {
  ActionParams,
  ActionType,
  CartItemTypes,
  ProviderProps,
  UserAuthParams,
} from '../utils/types/reducerTypes';
import {setItem, getItem} from '../utils/sInfo';

const initialState: UserAuthParams = {
  token: undefined,
  name: undefined,
  voucher: undefined,
  cartItem: [],
  addItem: () => null,
  addVoucher: () => null,
  hydrate: () => null,
  login: () => null,
  logout: () => null,
  removeItem: () => null,
  removeVoucher: () => null,
};

const reducer = (
  state: UserAuthParams,
  action: ActionParams,
): UserAuthParams => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {...state, ...action.payload};
    case ActionType.LOGOUT:
      return {...state, name: undefined, token: undefined, voucher: undefined};
    case ActionType.ADD_VOUCHER:
      return {...state, voucher: action.payload};
    case ActionType.REMOVE_VOUCHER:
      return {...state, voucher: undefined};
    case ActionType.ADD_TO_CARD: {
      const isExistIndex = state.cartItem?.findIndex(
        e => e.compositeId === action.item?.compositeId,
      );

      if (isExistIndex !== -1) {
        state.cartItem[isExistIndex] = {
          ...action.item,

          quantity:
            state?.cartItem[isExistIndex]?.quantity + action.item.quantity,
        };

        return {...state, cartItem: [...state.cartItem]};
      }
      return {...state, cartItem: [...state.cartItem, action.item]};
    }
    case ActionType.REMOVE_FROM_CART: {
      const filteredItem = state.cartItem
        .map(e => {
          if (e.compositeId === action.item?.compositeId) {
            return {
              ...action.item,
              quantity: e.quantity - action.item.quantity,
            };
          }
          return e;
        })
        .filter(e => e.quantity > 0);
      return {...state, cartItem: [...filteredItem]};
    }
    case ActionType.HYDRATE: {
      return {...state, ...action.payload};
    }
    default:
      return state;
  }
};

export const UserContext = createContext<UserAuthParams>(initialState);

const Provider: FC<ProviderProps> = ({children}) => {
  const [state, dispacth] = useReducer(reducer, initialState);
  const value: UserAuthParams = {
    token: state.token,
    name: state.name,
    voucher: state.voucher,
    cartItem: state.cartItem,
    login: (userData: UserAuthParams) => {
      dispacth({
        type: ActionType.LOGIN,
        payload: userData,
        item: {price: 0, quantity: 0},
      });
    },
    addVoucher: (userData: UserAuthParams) => {
      dispacth({
        type: ActionType.ADD_VOUCHER,
        payload: userData,
        item: {price: 0, quantity: 0},
      });
    },
    removeVoucher: () => {
      dispacth({
        type: ActionType.REMOVE_VOUCHER,
        item: {price: 0, quantity: 0},
      });
    },
    hydrate: (userData: UserAuthParams) => {
      dispacth({
        type: ActionType.HYDRATE,
        payload: userData,
        item: {price: 0, quantity: 0},
      });
    },
    logout: () => {
      dispacth({type: ActionType.LOGOUT, item: {price: 0, quantity: 0}});
    },
    addItem: (item: CartItemTypes) => {
      dispacth({type: ActionType.ADD_TO_CARD, item});
    },
    removeItem: (item: CartItemTypes) => {
      dispacth({type: ActionType.REMOVE_FROM_CART, item});
    },
  };

  useEffect(() => {
    (async () => {
      const result = await getItem('userInfo');
      dispacth({
        type: ActionType.HYDRATE,
        payload: result,
        item: {price: 0, quantity: 0},
      });
    })();
  }, []);

  useEffect(() => {
    const {name, token} = state;
    setItem('userInfo', {name, token, cartItem: []});
  }, [state]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default Provider;
