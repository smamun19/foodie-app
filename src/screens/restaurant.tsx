import React, {useRef} from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Animated,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FoodItem from '../components/FoodItemCardView';
import FoodItemHeader from '../components/FoodItemHeader';
import {RootStackScreensProps} from '../navigators/root-stack';
import {FOOD_DATA} from '../utils/testData';

const Restaurant = ({navigation}: RootStackScreensProps<'Restaurant'>) => {
  const sectionRef = useRef<SectionList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const translation = scrollY.interpolate({
    inputRange: [340, 410],
    outputRange: [0, 65],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {console.log(scrollY)}
      <StatusBar animated />
      <Animated.SectionList
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: scrollY},
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        ref={sectionRef}
        sections={FOOD_DATA}
        ListHeaderComponent={
          <FoodItemHeader
            test={scrollY}
            onSectionPress={e =>
              sectionRef.current?.scrollToLocation({
                sectionIndex: e,
                itemIndex: 0,
              })
            }
            flatListData={FOOD_DATA}
          />
        }
        renderSectionHeader={({section}) => (
          <Text style={styles.headerText}>{section.title}</Text>
        )}
        renderItem={({item}) => (
          <FoodItem
            price={item.price}
            name={item.name}
            description={item.description}
          />
        )}
      />
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: scrollY.interpolate({
              inputRange: [290, 291],
              outputRange: ['transparent', 'white'],
            }),
          },
        ]}>
        <View style={styles.leftHeader}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Drawer')}
            style={styles.menuBtn}>
            <MaterialIcons name="arrow-back" size={30} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.rightHeader}>
          <TouchableOpacity style={styles.rightHeaderBtn1}>
            <MaterialIcons name="favorite" size={30} color="red" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightHeaderBtn2}>
            <MaterialIcons name="shopping-cart" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  headerText: {fontWeight: 'bold', fontSize: 20, color: 'black', padding: 5},
  header: {
    padding: 5,
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

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
});

export default Restaurant;
