import React from 'react';
import Provider from './src/services/userContext';
import AppWrapper from './AppWrapper';

const App = () => {
  return (
    <Provider>
      <AppWrapper />
    </Provider>
  );
};

export default App;
