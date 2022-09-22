import React from 'react';
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {CompositeScreenProps} from '@react-navigation/native';
import Favourites from '../screens/favourites';
import Home from '../screens/home';
import Addresses from '../screens/addresses';
import Help from '../screens/help';
import Orders from '../screens/orders';
import Profile from '../screens/profile';
import CustomDrawer from '../components/CustomDrawer';
import {RootStackParamList} from './root-stack';

export type DrawerParamList = {
  Home: undefined;
  Favourites: undefined;
  Profile: undefined;
  Addresses: undefined;
  Orders: undefined;
  Help: undefined;
};

export type DrawerScreens = keyof DrawerParamList;

export type DrawerScreensProps<T extends DrawerScreens> = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

const {Navigator, Screen} = createDrawerNavigator<DrawerParamList>();

const Drawer = () => {
  return (
    <Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{headerShown: false}}>
      <Screen name="Home" component={Home} />
      <Screen name="Favourites" component={Favourites} />
      <Screen name="Profile" component={Profile} />
      <Screen name="Addresses" component={Addresses} />
      <Screen name="Orders" component={Orders} />
      <Screen name="Help" component={Help} />
    </Navigator>
  );
};

export default Drawer;
