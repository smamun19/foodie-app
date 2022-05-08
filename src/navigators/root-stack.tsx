import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Login from '../screens/login';
import Loader from '../screens/loader';
import SignUp from '../screens/signup';
import Otp from '../screens/otp';
import Drawer from './drawer';
import ResetPassword from '../screens/resetPassword';
import {DrawerParamList} from './drawer';
import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Loader: undefined;

  Login: undefined;
  Drawer: undefined | NavigatorScreenParams<DrawerParamList>;
  SignUp: undefined;
  Otp: {email: string; fromSignup?: Boolean};
  ResetPassword: {email: string};
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
  </Navigator>
);

export default RootStack;
