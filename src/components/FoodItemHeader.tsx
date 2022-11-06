import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Animated,
  SectionList,
  DefaultSectionT,
} from 'react-native';
import ThemedText from './ThemedText';

const HEADER_HEIGHT = 400;

interface HeaderProps {
  title?: string;
  distance?: string;
  rating?: number;
  specialOffer?: string;
  deliveryTime?: number;
  scrollY: Animated.Value;
  sectionRef: React.RefObject<SectionList<any, DefaultSectionT>>;
}

const FoodItemHeader = ({
  title = 'Restaurant name',
  rating = 200,
  distance = '1.2km',
  specialOffer,
  deliveryTime = 25,
  scrollY,
}: HeaderProps) => {
  return (
    <Animated.View
      style={[
        styles.container,
        specialOffer ? styles.specialOffer : styles.noSpecialOffer,
        {
          opacity: scrollY.interpolate({
            inputRange: [280, 290],
            outputRange: [1, 0],
          }),
        },
      ]}>
      <ImageBackground
        style={styles.imageStyle}
        source={require('../assets/burger.jpeg')}
      />

      {specialOffer ? (
        <View style={styles.view2}>
          <ThemedText style={styles.text1}>{specialOffer}</ThemedText>
          <Image
            style={styles.imageStyle2}
            resizeMode="cover"
            source={require('../assets/bootsplash_logo_original.png')}
          />
        </View>
      ) : null}
      <View style={styles.view3}>
        <View style={styles.view4}>
          <ThemedText>{title}</ThemedText>
          <ThemedText>{distance} away</ThemedText>
          <ThemedText>{rating}+ ratings</ThemedText>
          <ThemedText>Delivery: {deliveryTime} min</ThemedText>
        </View>
        <TouchableOpacity style={styles.moreInfoBtn}>
          <ThemedText style={styles.text2}>More info</ThemedText>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    flex: 1,
  },
  imageStyle: {height: 150, width: '100%'},
  imageStyle2: {
    height: 90,
    width: 30,
  },
  view2: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#e8e795',
    height: 100,
  },
  view3: {
    flexDirection: 'row',
    padding: 5,
  },
  view4: {
    flex: 1,
  },

  text1: {flex: 1, fontSize: 20, paddingRight: 15},
  text2: {color: 'red'},
  moreInfoBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  specialOffer: {height: HEADER_HEIGHT},
  noSpecialOffer: {height: 300},
});

export default FoodItemHeader;
