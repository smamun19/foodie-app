import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import RootStack from './src/navigators/root-stack';
import Provider from './src/services/userContext';
import {StatusBar} from 'react-native';

const App = () => (
  <Provider>
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {...DefaultTheme.colors, background: 'white'},
      }}>
      <StatusBar animated backgroundColor={'white'} barStyle={'dark-content'} />
      <RootStack />
    </NavigationContainer>
  </Provider>
);

export default App;
