import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  btnStyle?: StyleProp<ViewStyle>;
  btnInnerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const CustomButton = ({
  title,
  containerStyle,
  btnStyle,
  btnInnerStyle,
  textStyle,
  ...rest
}: ButtonProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity {...rest} style={[styles.btn, btnStyle]}>
        <View style={[styles.innerView, btnInnerStyle]}>
          <Text style={(styles.text, textStyle)}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  innerView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'uppercase',
  },
});

export default CustomButton;
