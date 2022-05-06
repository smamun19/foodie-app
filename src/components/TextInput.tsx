import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';

import {Card} from 'react-native-elements';

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
      {title ? <Text style={styles.title}>{title} </Text> : null}
      <Card
        wrapperStyle={[styles.inputInnerContainer]}
        containerStyle={[styles.inputOuterContainer, inputStyle]}>
        <TextInput {...rest} style={[styles.text, textStyle]} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    margin: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {width: '100%', marginHorizontal: 10, marginVertical: -8},
  inputOuterContainer: {
    padding: 0.1,
    backgroundColor: 'grey',
    borderRadius: 5,
    width: '100%',
  },
  inputInnerContainer: {
    backgroundColor: 'white',
  },
  text: {
    height: 45,
    paddingHorizontal: 10,
    color: 'grey',
  },
});

export default CustomInput;
