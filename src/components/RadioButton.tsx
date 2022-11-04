import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CheckBoxProps {
  data: Record<string, any>[];
  setCheck: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  check: Record<string, any>;
}

const RadioButton = ({data, check, setCheck}: CheckBoxProps) => {
  const click = (index: number) => {
    setCheck(data[index]);
  };
  const {colors} = useTheme();

  return (
    <View>
      {data.map((item, index) => {
        return (
          <Pressable
            key={item.name}
            onPress={() => click(index)}
            style={styles.container}>
            <View style={styles.lebel}>
              <MaterialIcons
                name={
                  check.name === item.name
                    ? 'check-circle'
                    : 'check-circle-outline'
                }
                size={20}
                color={check.name === item.name ? 'red' : 'grey'}
              />
              <Text style={[styles.name, {color: colors.text}]}>
                {item.name}
              </Text>
            </View>
            <View>
              <Text style={{color: colors.text}}>{item.price} Tk</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  lebel: {flexDirection: 'row'},
  name: {flexWrap: 'wrap', maxWidth: 250},
});

export default RadioButton;
