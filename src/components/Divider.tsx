import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface DividerProps {
  lineView?: ViewStyle;
}

const Divider = ({lineView}: DividerProps) => {
  const {colors} = useTheme();
  return (
    <View
      style={[styles.line, {backgroundColor: colors.background}, lineView]}
    />
  );
};

const styles = StyleSheet.create({
  line: {flex: 1, height: 1, marginVertical: 10},
});

export default Divider;
