import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export interface CardProps extends TouchableOpacityProps {
  title: string;
  btnStyle?: StyleProp<ViewStyle>;
  btnInnerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const CustomCard = ({title, ...rest}: CardProps) => {
  return (
    <TouchableOpacity {...rest} style={styles.card}>
      <ImageBackground
        style={styles.imgStyle}
        resizeMode="cover"
        source={require('../assets/foodie.jpeg')}>
        <View style={styles.leftImg}>
          <View style={styles.leftImg1}>
            <Text> 15% off</Text>
          </View>
          <View style={styles.leftImg2}>
            <Text>time</Text>
          </View>
        </View>
        <View style={styles.rightImg}>
          <View>
            <TouchableOpacity>
              <MaterialIcons name="favorite-border" size={22} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.cardBottomArea}>
        <View style={styles.cardBottomArea1}>
          <Text style={styles.titleText}>{title}</Text>
          <Text>type: Bangladeshi</Text>
          <Text>Tk: 18</Text>
        </View>
        <View>
          <Text>rating</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imgStyle: {
    flexDirection: 'row',
    height: 100,
    width: 200,
    justifyContent: 'space-between',
  },
  card: {
    marginHorizontal: 3,
  },
  titleText: {fontWeight: 'bold'},
  leftImg: {justifyContent: 'space-between'},
  leftImg1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 6,
    borderBottomEndRadius: 6,
    backgroundColor: 'red',
  },
  leftImg2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
    padding: 1,
  },
  rightImg: {
    justifyContent: 'space-between',
  },
  cardBottomArea: {flexDirection: 'row'},
  cardBottomArea1: {flex: 1},
});

export default CustomCard;
