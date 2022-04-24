import React from 'react';
import {View, Text} from 'react-native';

import {RootStackScreensProps} from '../navigators/root-stack';

const Main = ({navigation}: RootStackScreensProps<'Main'>) => {
  return (
    <View>
      <Text>This will be the after sign in page</Text>
    </View>
  );
};

export default Main;
