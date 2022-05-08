import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import Initial from '../screens/initial';
import Home from '../screens/home';

export type DrawerParamList = {
  Initial: undefined;
  Home: undefined;
};

export type DrawerScreens = keyof DrawerParamList;

export type DrawerScreensProps<T extends DrawerScreens> = DrawerNavigationProp<
  DrawerParamList,
  T
>;

const {Navigator, Screen} = createDrawerNavigator<DrawerParamList>();

const Drawer = () => {
  return (
    <Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Screen name="Home" component={Home} />
      <Screen name="Initial" component={Initial} />
    </Navigator>
  );
};

export default Drawer;
