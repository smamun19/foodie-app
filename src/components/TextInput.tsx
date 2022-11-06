import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import ThemedText from './ThemedText';

export interface InputProps extends TextInputProps {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const CustomInput = ({
  title,
  containerStyle,
  inputStyle,
  textStyle,
  ...rest
}: InputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {title ? <ThemedText style={styles.title}>{title}</ThemedText> : null}
      <View style={[styles.inputOuterContainer, inputStyle]}>
        <TextInput {...rest} style={[styles.text, textStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    margin: 10,
    alignItems: 'center',
  },
  title: {width: '100%', paddingVertical: 5},
  inputOuterContainer: {
    padding: 0.1,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.5,
    width: '100%',
    borderColor: '#6b6b6b',
  },
  text: {
    height: 45,
    paddingHorizontal: 10,
    color: 'grey',
  },
});

export default CustomInput;
