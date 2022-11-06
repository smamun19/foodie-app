import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/navigators/root-stack';
import {UserContext} from './src/services/userContext';
import {StatusBar} from 'react-native';
import {darkTheme, lightTheme} from './src/utils/Theme';

const Main = () => {
  const {darkMode} = useContext(UserContext);
  return (
    <NavigationContainer theme={darkMode ? darkTheme : lightTheme}>
      <StatusBar
        animated
        backgroundColor={darkMode ? 'black' : 'white'}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />
      <RootStack />
    </NavigationContainer>
  );
};

export default Main;
