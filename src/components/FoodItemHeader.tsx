import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from 'react-native';

const HEADER_HEIGHT = 400;

interface HeaderProps {
  title?: string;
  distance?: string;
  rating?: number;
  specialOffer?: string;
  deliveryTime?: number;
  flatListData?: Record<string, any>[];
  onSectionPress: (e: number) => void;
  test: any;
}

const FoodItemHeader = ({
  title = 'Restaurant name',
  rating = 200,
  distance = '1.2km',
  specialOffer = 'its working',
  deliveryTime = 25,
  flatListData,
  onSectionPress,
  test = 0,
}: HeaderProps) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          // transform: [
          //   {
          //     translateY: test.interpolate({
          //       inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          //       outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.85],
          //     }),
          //   },
          // ],
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
      <Animated.View
        style={[
          styles.view5,
          {
            opacity: test.interpolate({
              inputRange: [0, HEADER_HEIGHT],
              outputRange: [0, 1],
            }),
          },
        ]}>
        <FlatList
          horizontal={true}
          data={flatListData}
          renderItem={({item, index}) => (
            <View style={styles.view6}>
              <TouchableOpacity
                onPress={() => onSectionPress(index)}
                style={styles.flatListView}>
                <Text>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    flex: 1,
    overflow: 'hidden',
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
  // Last view of the header
  view5: {
    padding: 5,
    borderBottomWidth: 3,
    borderBottomColor: '#00000033',
    backgroundColor: 'tomato',
  },
  view6: {
    paddingHorizontal: 20,
  },
  text1: {flex: 1, fontSize: 20, color: '#bd06b4', paddingRight: 15},
  text2: {color: 'red'},
  moreInfoBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  flatListView: {paddingVertical: 15},
});

export default FoodItemHeader;
