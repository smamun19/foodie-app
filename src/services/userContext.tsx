import React, {FC} from 'react';
import {createContext, useReducer} from 'react';
import {
  ActionParams,
  ActionType,
  CartItemTypes,
  ProviderProps,
  UserAuthParams,
  ValueTypes,
} from '../utils/types/reducerTypes';

const initialState: UserAuthParams = {
  token: undefined,
  name: undefined,
  cartItem: [],
};

const reducer = (
  state: UserAuthParams,
  action: ActionParams,
): UserAuthParams => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {...state, ...action.payload};
    case ActionType.LOGOUT:
      return {...state, name: undefined, token: undefined};
    case ActionType.ADD_TO_CARD:
      return {
        ...state,
        //@ts-ignores
        cartItem: [...state.cartItem, action.item],
      };
    case ActionType.REMOVE_FROM_CART: {
      const filteredItem = state.cartItem.filter(e => {
        e.id !== action.item?.id;
      });
      return {...state, cartItem: [...filteredItem]};
    }
    default:
      return state;
  }
};

export const UserContext = createContext<ValueTypes | null>(null);

const Provider: FC<ProviderProps> = ({children}) => {
  const [state, dispacth] = useReducer(reducer, initialState);
  const value: ValueTypes = {
    token: state.token,
    name: state.name,
    cartItem: state.cartItem,
    login: (userData: UserAuthParams) => {
      dispacth({type: ActionType.LOGIN, payload: userData});
    },
    logout: () => {
      dispacth({type: ActionType.LOGOUT});
    },
    addItem: (item: CartItemTypes) => {
      dispacth({type: ActionType.ADD_TO_CARD, item});
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default Provider;
