import React, {useContext} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import RootStack from './src/navigators/root-stack';
import {UserContext} from './src/services/userContext';
import {StatusBar} from 'react-native';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    text: 'black',
  },
};

const darkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,

    background: 'black',
    text: 'white',
  },
};

const AppWrapper = () => {
  const {darkMode} = useContext(UserContext);
  return (
    <NavigationContainer theme={darkMode === true ? darkTheme : lightTheme}>
      <StatusBar
        animated
        backgroundColor={darkMode === true ? 'black' : 'white'}
        barStyle={darkMode === true ? 'light-content' : 'dark-content'}
      />
      <RootStack />
    </NavigationContainer>
  );
};

export default AppWrapper;
