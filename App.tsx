import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/navigators/root-stack';
import Provider from './src/services/userContext';

const App = () => (
  <Provider>
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  </Provider>
);

export default App;
