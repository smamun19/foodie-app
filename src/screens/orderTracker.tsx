import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';

import {RootStackScreensProps} from '../navigators/root-stack';

const OrderTracker = ({navigation}: RootStackScreensProps<'OrderTracker'>) => {
  return (
    <Container
      containerStyle={styles.containerStyle}
      header={
        <CustomHeader
          title="Your order"
          onLeftPress={() => navigation.goBack()}
        />
      }>
      <Text>hello</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {margin: 0},
});

export default OrderTracker;
