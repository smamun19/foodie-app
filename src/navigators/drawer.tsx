import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import Initial from '../screens/initial';
import Home from '../screens/home';
import CustomDrawer from '../components/CustomDrawer';

export type DrawerParamList = {
  Initial: undefined;
  Home: undefined;
  Home2: undefined;
  Home3: undefined;
  Home4: undefined;
  Home5: undefined;
  Home6: undefined;
  Home7: undefined;
  Home8: undefined;
  Home9: undefined;
  Home0: undefined;
  Home00: undefined;
  Home01: undefined;
  Home02: undefined;
};

export type DrawerScreens = keyof DrawerParamList;

export type DrawerScreensProps<T extends DrawerScreens> = DrawerNavigationProp<
  DrawerParamList,
  T
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
      <Screen name="Home0" component={Initial} />
      <Screen name="Home00" component={Initial} />
      <Screen name="Home01" component={Initial} />
      <Screen name="Home02" component={Initial} />
      <Screen name="Home2" component={Initial} />
      <Screen name="Home3" component={Initial} />
      <Screen name="Home4" component={Initial} />
      <Screen name="Home5" component={Initial} />
      <Screen name="Home6" component={Initial} />
      <Screen name="Home7" component={Initial} />
      <Screen name="Home8" component={Initial} />
      <Screen name="Home9" component={Initial} />
    </Navigator>
  );
};

export default Drawer;
