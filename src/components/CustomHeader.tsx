import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text, ViewStyle} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface HeaderProps {
  title?: string;
  name?: string;
  color?: string;
  size?: number;
  headerStyle?: ViewStyle;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  children?: React.ReactNode;
}

const CustomHeader: React.FC<HeaderProps> = ({
  title,
  onLeftPress,
  onRightPress,
  name = 'mood-bad',
  size,
  color,
  headerStyle,
}) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.header, headerStyle]}>
      <View style={styles.leftHeader}>
        <MaterialIcons
          onPress={onLeftPress}
          name="arrow-back"
          size={30}
          color="red"
        />
        <View style={styles.leftHeader1}>
          <Text style={[styles.text, {color: colors.text}]}>{title}</Text>
        </View>
      </View>
      <View style={styles.rightHeader}>
        {size && color ? (
          <MaterialIcons
            onPress={onRightPress}
            name={name}
            size={size}
            color={color}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 3,
    borderBottomColor: '#00000033',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  leftHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightHeader: {},
  leftHeader1: {marginLeft: 15},
  text: {fontWeight: 'bold', fontSize: 20},
});

export default CustomHeader;
