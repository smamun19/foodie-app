import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface CardProps {
  children?: React.ReactNode;
  cardView?: ViewStyle;
}

const CardView = ({children, cardView}: CardProps) => {
  return <View style={[styles.card, cardView]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    padding: 5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderLeftColor: '#6b6b6b',
    borderBottomColor: '#6b6b6b',
    borderRightWidth: 0.5,
    borderRightColor: '#6b6b6b',
  },
});

export default CardView;
