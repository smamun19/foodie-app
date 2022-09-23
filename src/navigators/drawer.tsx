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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RootStackParamList} from './root-stack';
import {StyleSheet} from 'react-native';

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
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: styles.drawerLabelStyle,
      }}>
      <Screen
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Screen
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialIcons name="favorite" size={size} color={color} />
          ),
        }}
        name="Favourites"
        component={Favourites}
      />
      <Screen
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialIcons name="perm-identity" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={Profile}
      />
      <Screen
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialIcons name="location-on" size={size} color={color} />
          ),
        }}
        name="Addresses"
        component={Addresses}
      />
      <Screen
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialIcons name="list-alt" size={size} color={color} />
          ),
        }}
        name="Orders"
        component={Orders}
      />
      <Screen
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialIcons name="help-center" size={size} color={color} />
          ),
        }}
        name="Help"
        component={Help}
      />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  drawerLabelStyle: {marginLeft: -20},
});

export default Drawer;
