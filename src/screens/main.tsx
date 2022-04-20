import React from 'react';
import {View, Text} from 'react-native';

import {RootStackScreensProps} from '../navigators/root-stack';

const Main = ({navigation}: RootStackScreensProps<'Main'>) => {
  return (
    <View>
      <Text>This will be the verify email page</Text>
    </View>
  );
};

export default Main;
