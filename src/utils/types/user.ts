import {Roles} from './reducerTypes';

export interface User {
  id: string;
  roles: Roles[];
  token: string;
  name: string;
  phone?: string;
  email: string;
  address: Address[];
  currentOrderId?: string;
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

export interface Restaurants {
  type: string;
  data: Restaurant[];
}

export interface Restaurant {
  id: string;
  title: string;
  isActive: boolean;
  details: string;
  openingFrom: number;
  openingTo: number;
  deliveryTime: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  photo?: Photo;
}

export interface Photo {
  id: string;
  name: string;
  type: string;
  path: string[];
  host: string;
  itemId?: number;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RestaurantItems {
  title: string;
  data: Item[];
}

export interface RestaurantWithItems {
  restaurant: Restaurant;
  restaurantItems: RestaurantItems[];
}

export interface Item {
  id: number;
  name: string;
  price: number;
  category: string;
  isActive: boolean;
  details: string;
  createdAt: Date;
  updatedAt: Date;
  restaurantId: string;
  photo?: Photo;
  variation: Variation[];
}

export interface Variation {
  id: number;
  name: string;
  price: number;
  itemId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  restaurantId: string;
  totalFee: number;
  subTotalFee: number;
  data: OrderItem[];
}

export interface OrderItem {
  itemId?: number;
  price: number;
  variation?: string;
  quantity: number;
}

export interface OrderDetails {
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  restaurantId: string;
  subTotalFee: number;
  totalFee: number;
  restaurant: Restaurant;
  items: OrderedItem[];
  voucher?: Voucher;
}

export interface OrderedItem {
  itemId: number;
  quantity: number;
  price: number;
  variation: string;
  createdAt: Date;
  updatedAt: Date;
  orderId: string;
  item: Item;
}
