import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import Login from '../screens/login';
import Loader from '../screens/loader';
import SignUp from '../screens/signup';
import Otp from '../screens/otp';
import Drawer from './drawer';
import ResetPassword from '../screens/resetPassword';
import Restaurant from '../screens/restaurant';
import FoodDetails from '../screens/foodDetails';
import {DrawerParamList} from './drawer';
import Cart from '../screens/cart';
import Voucher from '../screens/voucher';
import Checkout from '../screens/checkout';
import ProfileEdit from '../screens/profileEdit';
import AddressEdit from '../screens/addressEdit';

export type RootStackParamList = {
  Loader: undefined;
  Login: undefined;
  Drawer: undefined | NavigatorScreenParams<DrawerParamList>;
  SignUp: undefined;
  Otp: {email: string; fromSignup?: Boolean};
  ResetPassword: {email: string};
  Restaurant: undefined;
  FoodDetails: undefined;
  Cart: undefined;
  Voucher: undefined;
  Checkout: {totalAmount: number; subTotal?: number; deliveryFee: number};
  ProfileEdit: {title: string};
  AddressEdit: {edit: boolean};
};

export type RootStackScreens = keyof RootStackParamList;

export type RootStackScreensProps<T extends RootStackScreens> =
  NativeStackScreenProps<RootStackParamList, T>;

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="Loader" component={Loader} />
    <Screen name="Login" component={Login} />
    <Screen name="Drawer" component={Drawer} />
    <Screen name="SignUp" component={SignUp} />
    <Screen name="Otp" component={Otp} />
    <Screen name="ResetPassword" component={ResetPassword} />
    <Screen name="Restaurant" component={Restaurant} />
    <Screen name="FoodDetails" component={FoodDetails} />
    <Screen name="Cart" component={Cart} />
    <Screen name="Voucher" component={Voucher} />
    <Screen name="Checkout" component={Checkout} />
    <Screen name="ProfileEdit" component={ProfileEdit} />
    <Screen name="AddressEdit" component={AddressEdit} />
  </Navigator>
);

export default RootStack;
