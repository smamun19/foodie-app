import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {DrawerScreensProps} from '../navigators/drawer';

const Initial = ({navigation}: DrawerScreensProps<'Initial'>) => {
  return (
    <Container
      header={
        <CustomHeader
          title="Initial"
          onLeftPress={() => navigation.navigate('Home')}
        />
      }>
      <Text>hello</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollview: {
    flex: 1,
  },
});

export default Initial;
