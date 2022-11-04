import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {UserContext} from '../services/userContext';
import CustomButton from './CustomButton';
import {useTheme} from '@react-navigation/native';
import Spacer from './Spacer';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const userInfo = useContext(UserContext);
  const {colors} = useTheme();
  const logout = () => {
    userInfo.logout();
    props.navigation.navigate('Login');
  };

  const toggleDarkMode = () => {
    userInfo.hydrate({
      address: userInfo.address,
      cartItem: userInfo.cartItem,
      darkMode: !userInfo.darkMode,
    });
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <ImageBackground
          source={require('../assets/transparent.png')}
          style={styles.imgBackground}>
          <Image
            source={require('../assets/hisoka-face.png')}
            style={styles.img}
          />
          {userInfo.token ? (
            <Text style={[styles.text, {color: colors.text}]}>
              {userInfo.name ?? 'Ops! Where is your name?'}
            </Text>
          ) : (
            <CustomButton
              title="Login / Create account"
              onPress={() => props.navigation.navigate('Login')}
            />
          )}
        </ImageBackground>
        <View style={styles.item}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottom}>
        <Pressable onPress={toggleDarkMode} style={styles.bottomFragment}>
          <MaterialCommunityIcons
            style={{color: colors.text}}
            name="theme-light-dark"
            size={25}
          />
          <Text style={[styles.bottomFragmentText, {color: colors.text}]}>
            {userInfo.darkMode ? 'Light Theme' : 'Dark Theme'}
          </Text>
        </Pressable>
        <Spacer />
        {userInfo.token ? (
          <Pressable onPress={logout} style={styles.bottomFragment}>
            <MaterialCommunityIcons
              style={{color: colors.text}}
              name="logout"
              size={25}
            />
            <Text style={[styles.bottomFragmentText, {color: colors.text}]}>
              Log out
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => props.navigation.navigate('Login')}
            style={styles.bottomFragment}>
            <MaterialCommunityIcons
              style={{color: colors.text}}
              name="login"
              size={25}
            />
            <Text style={[styles.bottomFragmentText, {color: colors.text}]}>
              Log in
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  imgBackground: {padding: 10},
  img: {height: 50, width: 50, borderRadius: 40, marginBottom: 10},
  item: {flex: 1, paddingTop: 10},
  text: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginBottom: 5,
  },
  bottom: {
    padding: 10,
    borderTopWidth: 2,
    borderBottomColor: 'grey',
  },
  bottomFragment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomFragmentText: {
    marginLeft: 20,
  },
});

export default CustomDrawer;
