import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface DividerProps {
  lineView?: ViewStyle;
}

const Divider = ({lineView}: DividerProps) => {
  return <View style={[styles.line, lineView]} />;
};

const styles = StyleSheet.create({
  line: {flex: 1, height: 1, backgroundColor: '#e0dcdc', marginVertical: 10},
});

export default Divider;
