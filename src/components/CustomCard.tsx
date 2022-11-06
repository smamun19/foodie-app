import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ThemedText from './ThemedText';

export interface CardProps extends TouchableOpacityProps {
  title: string;
  iconName?: string;
  cardStyle?: StyleProp<ViewStyle>;
  imgStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  specialOffer?: string;
  imgBorderRadius?: number;
}

const CustomCard = ({
  title,
  cardStyle,
  imgStyle,
  specialOffer,
  imgBorderRadius,
  iconName = 'favorite-border',
  ...rest
}: CardProps) => {
  return (
    <TouchableOpacity {...rest} style={[styles.card, cardStyle]}>
      <ImageBackground
        style={[styles.imgStyle, imgStyle]}
        borderRadius={imgBorderRadius}
        resizeMode="cover"
        source={require('../assets/placeholder.jpg')}>
        <View style={styles.leftImg}>
          <View style={styles.leftImg1}>
            {specialOffer ? <ThemedText> {specialOffer}</ThemedText> : null}
          </View>
          <View style={styles.leftImg2}>
            <ThemedText style={styles.blackText}>69 min</ThemedText>
          </View>
        </View>
        <View style={styles.rightImg}>
          <View>
            <TouchableOpacity>
              <MaterialIcons name={iconName} size={22} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.cardBottomArea}>
        <View style={styles.cardBottomArea1}>
          <ThemedText style={styles.titleText}>{title}</ThemedText>
          <ThemedText>type: Bangladeshi</ThemedText>
          <ThemedText>Tk: 18</ThemedText>
        </View>
        <View>
          <ThemedText>rating</ThemedText>
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
    marginRight: 0,
  },
  titleText: {fontWeight: 'bold'},
  leftImg: {justifyContent: 'space-between'},
  leftImg1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 6,
    borderBottomEndRadius: 6,
    backgroundColor: 'red',
    marginTop: 8,
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
    marginTop: 8,
    marginRight: 8,
  },
  cardBottomArea: {flexDirection: 'row'},
  cardBottomArea1: {flex: 1},
  blackText: {color: 'black'},
});

export default CustomCard;
