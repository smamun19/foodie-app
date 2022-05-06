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
  cardStyle?: StyleProp<ViewStyle>;
  imgStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  specialOffer?: string;
}

const CustomCard = ({
  title,
  cardStyle,
  imgStyle,
  specialOffer,
  ...rest
}: CardProps) => {
  return (
    <TouchableOpacity {...rest} style={[styles.card, cardStyle]}>
      <ImageBackground
        style={[styles.imgStyle, imgStyle]}
        resizeMode="cover"
        source={require('../assets/placeholder.jpg')}>
        <View style={styles.leftImg}>
          <View style={styles.leftImg1}>
            {specialOffer ? <Text> {specialOffer}</Text> : null}
          </View>
          <View style={styles.leftImg2}>
            <Text>69 min</Text>
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
    height: 150,
    width: 200,

    justifyContent: 'space-between',
  },
  card: {
    marginHorizontal: 5,
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
    borderRadius: 15,
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    marginHorizontal: 5,
    padding: 3,
    marginBottom: 5,
  },
  rightImg: {
    justifyContent: 'space-between',
  },
  cardBottomArea: {flexDirection: 'row'},
  cardBottomArea1: {flex: 1},
});

export default CustomCard;
