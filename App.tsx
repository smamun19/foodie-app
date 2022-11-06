import React from 'react';
import Provider from './src/services/userContext';
import Main from './Main';

const App = () => {
  return (
    <Provider>
      <Main />
    </Provider>
  );
};

export default App;
