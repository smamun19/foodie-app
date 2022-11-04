import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
} from 'react-native';

export interface CardProps extends TouchableOpacityProps {
  name: string;
  description?: string;
  price: number;
}

const FoodItem = ({name, description, price, ...rest}: CardProps) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <View style={styles.left}>
        <Text style={[styles.titleText, {color: colors.text}]}>{name}</Text>
        <Text numberOfLines={2} style={{color: colors.text}}>
          {description}
        </Text>
        <Text style={{color: colors.text}}>{price} tk</Text>
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
  },
  left: {flex: 1, paddingRight: 10},
  right: {},
  imageStyle: {height: 80, width: 80},
  titleText: {fontWeight: 'bold', fontSize: 15},
  desText: {},
  priceText: {},
});

export default FoodItem;
