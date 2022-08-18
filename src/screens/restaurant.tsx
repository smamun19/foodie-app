import React, {useContext, useMemo, useRef} from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Animated,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FoodItem from '../components/FoodItemCardView';
import FoodItemHeader from '../components/FoodItemHeader';
import {RootStackScreensProps} from '../navigators/root-stack';
import {UserContext} from '../services/userContext';
import {FOOD_DATA} from '../utils/testData';

const Restaurant = ({navigation}: RootStackScreensProps<'Restaurant'>) => {
  const sectionRef = useRef<SectionList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const userInfo = useContext(UserContext);
  const deliveryFee = 15;
  const specialOffer = 'undefined';

  const voucherValue = userInfo?.voucher?.value ?? 0;

  const totalItem = useMemo(() => {
    return userInfo?.cartItem.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.quantity;
    }, 0);
  }, [userInfo?.cartItem]);

  const totalAmount = useMemo(() => {
    const subTotal = userInfo?.cartItem.reduce(
      (previousValue, currentValue) => {
        return previousValue + currentValue.price * currentValue.quantity;
      },
      0,
    );
    // @ts-ignore
    return subTotal + deliveryFee - voucherValue;
  }, [userInfo?.cartItem, voucherValue]);

  return (
    <View style={styles.container}>
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
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        ref={sectionRef}
        sections={FOOD_DATA}
        ListHeaderComponent={
          <FoodItemHeader
            sectionRef={sectionRef}
            specialOffer={specialOffer}
            scrollY={scrollY}
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
            onPress={() => navigation.navigate('FoodDetails')}
          />
        )}
      />
      <Animated.View style={[styles.header]}>
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
            <MaterialIcons
              onPress={() => navigation.navigate('Cart')}
              name="shopping-cart"
              size={30}
              color="red"
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      {/* <Animated.View
        style={[
          styles.view5,
          {top: specialOffer ? 340 : 240},
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 200],
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
      </Animated.View> */}
      <View>
        {userInfo?.cartItem.length !== 0 ? (
          <Pressable
            onPress={() => {
              navigation.navigate('Cart');
            }}
            style={styles.conditionalFooter}>
            <View style={styles.footerItemCounter}>
              <Text style={styles.footerText}>{totalItem}</Text>
            </View>
            <Text style={styles.footerText}>View your cart</Text>
            <Text style={styles.footerText}>Tk {totalAmount}</Text>
          </Pressable>
        ) : null}
      </View>
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
  view6: {
    paddingHorizontal: 20,
  },
  view5: {
    padding: 5,
    borderBottomWidth: 3,
    borderBottomColor: '#00000033',
    position: 'relative',
    width: '100%',
    marginBottom: 400,
    backgroundColor: 'red',
  },
  flatListView: {paddingVertical: 10},
  conditionalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    height: 40,
  },
  footerText: {color: 'white', alignSelf: 'center'},
  footerItemCounter: {
    borderRadius: 12,
    height: 24,
    width: 24,
    borderColor: 'white',
    borderWidth: 1,
  },
});

export default Restaurant;
