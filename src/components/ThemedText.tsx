import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Text, TextProps} from 'react-native';

const ThemedText = ({style, ...rest}: TextProps) => {
  const {colors} = useTheme();

  return <Text style={[{color: colors.text}, style]} {...rest} />;
};

export default ThemedText;
