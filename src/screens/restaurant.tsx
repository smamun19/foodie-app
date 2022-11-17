import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {
  SectionList,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import FoodItem from '../components/FoodItemCardView';
import FoodItemHeader from '../components/FoodItemHeader';
import ThemedText from '../components/ThemedText';
import {RootStackScreensProps} from '../navigators/root-stack';
import {getRestaurantItems} from '../services/public';
import {UserContext} from '../services/userContext';
import {RestaurantWithItems} from '../utils/types/user';

const Restaurant = ({
  navigation,
  route,
}: RootStackScreensProps<'Restaurant'>) => {
  const sectionRef = useRef<SectionList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const userInfo = useContext(UserContext);
  const [restaurantWithItems, setRestaurantWithItems] =
    useState<RestaurantWithItems>();

  const deliveryFee = 15;
  const specialOffer = undefined;
  const range = specialOffer ? 300 : 200;

  const voucherValue = userInfo.voucher?.value ?? 0;

  useEffect(() => {
    getRestaurantItems(route.params.id)
      .then(result => setRestaurantWithItems(result.details))
      .catch(() => {
        Alert.alert(
          'Error!',
          'Unable to process your request at this moment',
          undefined,
          {
            cancelable: true,
          },
        );
      });
  }, [route.params.id]);

  const totalItem = useMemo(() => {
    return userInfo.cartItem.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.quantity;
    }, 0);
  }, [userInfo.cartItem]);

  const totalAmount = useMemo(() => {
    const subTotal = userInfo.cartItem.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.price * currentValue.quantity;
    }, 0);

    return subTotal ?? 0 + deliveryFee - voucherValue;
  }, [userInfo.cartItem, voucherValue]);

  if (!restaurantWithItems) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        animated
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
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
        sections={restaurantWithItems?.restaurantItems}
        renderSectionFooter={() => <View style={styles.sectionFooter} />}
        ListHeaderComponent={({}) => (
          <FoodItemHeader
            sectionRef={sectionRef}
            specialOffer={specialOffer}
            scrollY={scrollY}
            title={restaurantWithItems?.restaurant.title}
            deliveryTime={restaurantWithItems?.restaurant.deliveryTime}
          />
        )}
        renderSectionHeader={({section}) => (
          <ThemedText style={styles.headerText}>{section.title}</ThemedText>
        )}
        renderItem={({item}) => (
          <FoodItem
            price={item.price}
            name={item.name}
            description={item.details}
            onPress={() =>
              navigation.navigate('FoodDetails', {
                id: item.id,
                restaurantId: route.params.id,
              })
            }
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
            <MaterialIcons
              onPress={() =>
                navigation.navigate('Drawer', {screen: 'Favourites'})
              }
              name="favorite"
              size={30}
              color="red"
            />
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
      <Animated.View
        style={[
          styles.view5,
          specialOffer ? styles.specialOffer : styles.noSpecialOffer,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, range],
                  outputRange: [0, -range],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <FlatList
          horizontal={true}
          data={restaurantWithItems?.restaurantItems}
          renderItem={({item, index}) => (
            <View style={styles.view6}>
              <TouchableOpacity
                onPress={() =>
                  sectionRef.current?.scrollToLocation({
                    sectionIndex: index,
                    itemIndex: 0,
                    viewOffset: 90,
                    animated: true,
                  })
                }
                style={styles.flatListView}>
                <ThemedText>{item.title}</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        />
      </Animated.View>
      <View>
        {userInfo.cartItem.length !== 0 ? (
          <Pressable
            onPress={() => {
              navigation.navigate('Cart');
            }}
            style={styles.conditionalFooter}>
            <View style={styles.footerItemCounter}>
              <ThemedText style={styles.footerText}>{totalItem}</ThemedText>
            </View>
            <ThemedText style={styles.footerText}>View your cart</ThemedText>
            <ThemedText style={styles.footerText}>Tk {totalAmount}</ThemedText>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  headerText: {fontWeight: 'bold', fontSize: 20, padding: 5},
  header: {
    padding: 5,
    flexDirection: 'row',
    position: 'absolute',
    top: 25,
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
    position: 'absolute',
    width: '100%',
    marginBottom: 400,
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
  specialOffer: {top: 340},
  noSpecialOffer: {top: 240},
  sectionFooter: {backgroundColor: '#f5f4f2', height: 15},
});

export default Restaurant;
