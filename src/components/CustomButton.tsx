import {useTheme} from '@react-navigation/native';
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
  const {colors} = useTheme();
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity {...rest} style={[styles.btn, btnStyle]}>
        <View style={[styles.innerView, btnInnerStyle]}>
          <Text style={[styles.text, {color: colors.text}, textStyle]}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  innerView: {
    borderRadius: 60,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default CustomButton;
