import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
  FlatList,
  SectionList,
  DefaultSectionT,
} from 'react-native';
import {FOOD_DATA} from '../utils/testData';

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
  sectionRef,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
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
            <Text style={styles.text1}>{specialOffer}</Text>
            <Image
              style={styles.imageStyle2}
              resizeMode="cover"
              source={require('../assets/bootsplash_logo_original.png')}
            />
          </View>
        ) : null}
        <View style={styles.view3}>
          <View style={styles.view4}>
            <Text>{title}</Text>
            <Text>{distance} away</Text>
            <Text>{rating}+ ratings</Text>
            <Text>Delivery: {deliveryTime} min</Text>
          </View>
          <TouchableOpacity style={styles.moreInfoBtn}>
            <Text style={styles.text2}>More info</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.view5,

          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 600],
                  outputRange: [0, -200],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <FlatList
          horizontal={true}
          data={FOOD_DATA}
          renderItem={({item, index}) => (
            <View style={styles.view6}>
              <TouchableOpacity
                onPress={() =>
                  sectionRef.current?.scrollToLocation({
                    sectionIndex: index,
                    itemIndex: 0,
                  })
                }
                style={styles.flatListView}>
                <Text>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </Animated.View>
    </View>
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
  },
  view3: {
    flexDirection: 'row',
    padding: 5,
  },
  view4: {
    flex: 1,
  },

  text1: {flex: 1, fontSize: 20, color: '#bd06b4', paddingRight: 15},
  text2: {color: 'red'},
  moreInfoBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  view6: {
    paddingHorizontal: 20,
  },
  view5: {
    padding: 5,
    borderBottomWidth: 3,
    borderBottomColor: '#00000033',
    position: 'relative',

    width: '100%',
    backgroundColor: 'red',
  },
  flatListView: {paddingVertical: 10},
});

export default FoodItemHeader;
