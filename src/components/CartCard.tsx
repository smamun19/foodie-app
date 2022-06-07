import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const CartCard = ({}) => {
  return (
    <View style={styles.cartCard}>
      <Text>1 X</Text>
      <Image source={require('../assets/placeholder.jpg')} style={styles.img} />
      <Text>name</Text>
      <Text>Tk 199</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cartCard: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: '#6b6b6b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  img: {height: 50, width: 50},
});

export default CartCard;
