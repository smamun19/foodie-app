import React, {useContext} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../services/userContext';
import {CartItemTypes} from '../utils/types/reducerTypes';

const CartCard = ({
  name,
  price,
  quantity,
  variation,
  id,
  compositeId,
}: CartItemTypes) => {
  const userInfo = useContext(UserContext);

  const removeItem = () => {
    if (variation) {
      userInfo?.removeItem({
        id: id,
        variation: variation,
        price: price,
        quantity: 1,
        name: name,
        compositeId: compositeId,
      });
      return;
    }

    userInfo?.removeItem({
      id: id,
      price: price,
      quantity: 1,
      name: name,
      compositeId: compositeId,
    });
  };

  const addQuantity = () => {
    if (variation) {
      userInfo?.addItem({
        id: id,
        variation: variation,
        price: price,
        quantity: 1,
        name: name,
        compositeId: compositeId,
      });
      return;
    }

    userInfo?.addItem({
      id: id,
      price: price,
      quantity: 1,
      name: name,
      compositeId: compositeId,
    });
  };

  const removeQuantity = () => {
    if (quantity === 1) {
      return Alert.alert(
        'WARNING!',
        'Do you want to remove this item from the cart?',
        [{text: 'CANCEL'}, {text: 'YES', onPress: removeItem}],
      );
    }
    removeItem();
  };
  return (
    <View style={styles.cartCard}>
      <View style={styles.leftSection}>
        <MaterialIcons
          onPress={removeQuantity}
          name="remove-circle"
          size={30}
          color="red"
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <MaterialIcons
          onPress={addQuantity}
          name="add-circle"
          size={30}
          color="red"
        />

        <Image
          source={require('../assets/placeholder.jpg')}
          style={styles.img}
        />

        <Text style={styles.name}>
          {name} {variation ? ` - ${variation}` : null}
        </Text>
      </View>

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
    justifyContent: 'space-between',
  },
  img: {height: 50, width: 50, marginLeft: 20},
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flexWrap: 'wrap',
    width: 150,
    marginLeft: 20,
  },
  quantity: {
    width: 25,
    textAlign: 'center',
  },
});

export default CartCard;
