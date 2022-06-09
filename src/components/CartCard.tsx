import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface CartCardProps {
  quantity: number;
  name: string;
  price: number;
  variation?: string;
}

const CartCard = ({name, price, quantity, variation}: CartCardProps) => {
  return (
    <View style={styles.cartCard}>
      <Text>{quantity} X</Text>
      <Image source={require('../assets/placeholder.jpg')} style={styles.img} />
      <Text>
        {name} {variation ? ` - ${variation}` : null}
      </Text>
      <Text>Tk {price * quantity}</Text>
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
