import React, {useContext} from 'react';
import {View, StyleSheet, Text, ImageBackground, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import {UserContext} from '../services/userContext';
import CustomButton from './CustomButton';
import {useTheme} from '@react-navigation/native';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const userInfo = useContext(UserContext);
  const {colors} = useTheme();
  const logout = () => {
    userInfo.logout();
    props.navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <ImageBackground
          source={require('../assets/white.jpg')}
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
        <View style={[styles.item, {backgroundColor: colors.background}]}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottom}>
        {userInfo.token ? (
          <CustomButton title="Logout" onPress={logout} />
        ) : (
          <CustomButton
            title="Login / Create account"
            onPress={() => props.navigation.navigate('Login')}
          />
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
});

export default CustomDrawer;
