import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
} from 'react-native';
import ThemedText from './ThemedText';

export interface CardProps extends TouchableOpacityProps {
  name: string;
  description?: string;
  price: number;
}

const FoodItem = ({name, description, price, ...rest}: CardProps) => {
  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <View style={styles.left}>
        <ThemedText style={styles.titleText}>{name}</ThemedText>
        <ThemedText numberOfLines={2}>{description}</ThemedText>
        <ThemedText>Tk {price}</ThemedText>
      </View>
      <View style={styles.right}>
        <Image
          style={styles.imageStyle}
          source={require('../assets/burger.jpeg')}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderBottomColor: '#dedddc',
    borderBottomWidth: 1,
  },
  left: {flex: 1, paddingRight: 10},
  right: {},
  imageStyle: {height: 80, width: 80},
  titleText: {fontWeight: 'bold', fontSize: 15},
  desText: {},
  priceText: {},
});

export default FoodItem;
