import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Initial from '../screens/initial';
import Main from '../screens/main';
import Login from '../screens/login';
import Loader from '../screens/loader';
import SignUp from '../screens/signup';
import Otp from '../screens/otp';
import ResetPassword from '../screens/resetPassword';

export type RootStackParamList = {
  Loader: undefined;
  Initial: undefined;
  Main: undefined;
  Login: undefined;
  SignUp: undefined;
  Otp: undefined;
  ResetPassword: undefined;
};

export type RootStackScreens = keyof RootStackParamList;

export type RootStackScreensProps<T extends RootStackScreens> =
  NativeStackScreenProps<RootStackParamList, T>;

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="Loader" component={Loader} />
    <Screen name="Initial" component={Initial} />
    <Screen name="Login" component={Login} />
    <Screen name="Main" component={Main} />
    <Screen name="SignUp" component={SignUp} />
    <Screen name="Otp" component={Otp} />
    <Screen name="ResetPassword" component={ResetPassword} />
  </Navigator>
);

export default RootStack;
