import React from 'react';
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {CompositeScreenProps} from '@react-navigation/native';
import Initial from '../screens/initial';
import Home from '../screens/home';
import CustomDrawer from '../components/CustomDrawer';
import {RootStackParamList} from './root-stack';

export type DrawerParamList = {
  Home: undefined;
  Initial: undefined;
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
      <Screen name="Initial" component={Initial} />
    </Navigator>
  );
};

export default Drawer;
