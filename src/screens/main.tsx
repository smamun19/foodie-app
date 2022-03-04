import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import CustomModal from '../components/Modal';
import {RootStackScreensProps} from '../navigators/root-stack';

const Main = ({navigation}: RootStackScreensProps<'Main'>) => {
  return <CustomModal />;
};

export default Main;
