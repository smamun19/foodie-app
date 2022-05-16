import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface HeaderProps {
  title?: string;
  distance?: string;
  rating?: number;
  specialOffer?: string;
  deliveryTime?: number;
  flatListData?: Record<string, any>[];
  onSectionPress: (e: number) => void;
  onLeftPress?: () => void;
  onRightPress1?: () => void;
  onRightPress2?: () => void;
}

const FoodItemHeader = ({
  title = 'Restaurant name',
  rating = 200,
  distance = '1.2km',
  specialOffer = 'its working',
  deliveryTime = 25,
  flatListData,
  onSectionPress,
  onLeftPress,
  onRightPress1,
  onRightPress2,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageStyle}
        source={require('../assets/burger.jpeg')}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <TouchableOpacity onPress={onLeftPress} style={styles.menuBtn}>
              <MaterialIcons name="arrow-back" size={30} color="red" />
            </TouchableOpacity>
          </View>
          <View style={styles.rightHeader}>
            <TouchableOpacity
              onPress={onRightPress1}
              style={styles.rightHeaderBtn1}>
              <MaterialIcons name="favorite" size={30} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onRightPress2}
              style={styles.rightHeaderBtn2}>
              <MaterialIcons name="shopping-cart" size={30} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
      <View style={styles.view5}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {borderBottomWidth: 3, borderBottomColor: '#00000033', flex: 1},
  imageStyle: {height: 150, width: '100%'},
  imageStyle2: {
    height: 90,
    width: 30,
  },
  header: {padding: 5, flexDirection: 'row'},

  leftHeader: {
    flex: 1,
    flexDirection: 'row',
  },

  rightHeader: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  rightHeaderBtn1: {
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  rightHeaderBtn2: {
    borderRadius: 20,
    backgroundColor: 'white',
  },
  menuBtn: {alignSelf: 'center', borderRadius: 20, backgroundColor: 'white'},
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
  view5: {
    padding: 5,
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
