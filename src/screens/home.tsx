import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import CustomCard from '../components/CustomCard';
import Spacer from '../components/Spacer';
import CustomInput from '../components/TextInput';
import ThemedText from '../components/ThemedText';
import {DrawerScreensProps} from '../navigators/drawer';
import {getAllRestaurants, getRestaurants} from '../services/public';
import {UserContext} from '../services/userContext';
import {Restaurant, Restaurants} from '../utils/types/user';

const Home = ({navigation}: DrawerScreensProps<'Home'>) => {
  const {address, currentOrderId} = useContext(UserContext);
  const [restaurants, setRestaurants] = useState<Restaurants[]>();
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>();

  const getAllRestaurantsHandler = async () => {
    try {
      const {statusCode, message, details} = await getAllRestaurants();
      if (statusCode !== 200) {
        return Alert.alert('Error!', message, undefined, {
          cancelable: true,
        });
      }
      if (!details || details.length === 0) {
        return null;
      }
      setAllRestaurants(details);
    } catch (error) {
      return Alert.alert(
        'Error!',
        'Unable to process your request at this moment',
        undefined,
        {
          cancelable: true,
        },
      );
    }
  };

  useEffect(() => {
    if (!restaurants) {
      getRestaurants()
        .then(result => setRestaurants(result.details))
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
    }
  }, [restaurants]);

  if (!restaurants) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <View style={styles.leftHeader}>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => navigation.toggleDrawer()}>
              <MaterialIcons name="menu" size={30} color="red" />
            </TouchableOpacity>
            <View style={styles.leftHeader1}>
              {address.length !== 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AddressEdit', {
                      address: address[0],
                      edit: true,
                    })
                  }>
                  <ThemedText style={styles.text2}>
                    {address[0].label ?? address[0].name}
                  </ThemedText>
                  <ThemedText style={styles.text}>
                    {address[0].details}
                  </ThemedText>
                </TouchableOpacity>
              ) : (
                <CustomButton
                  containerStyle={styles.locationBtn}
                  textStyle={styles.locationBtnText}
                  title="Add an address"
                  onPress={() =>
                    navigation.navigate('AddressEdit', {edit: false})
                  }
                />
              )}
            </View>
          </View>
          <View style={styles.rightHeader}>
            <TouchableOpacity style={styles.rightHeaderBtn}>
              <MaterialIcons
                onPress={() =>
                  navigation.navigate('Drawer', {screen: 'Favourites'})
                }
                name="favorite"
                size={22}
                color="red"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons
                onPress={() => navigation.navigate('Cart')}
                name="shopping-cart"
                size={22}
                color="red"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <CustomInput
            containerStyle={styles.bottomHeader}
            placeholder="Search for restaurants"
          />
        </View>
      </View>
      <Spacer />
      <FlatList
        data={restaurants}
        keyExtractor={e => e.type}
        onScroll={({nativeEvent}) => {
          if (!allRestaurants) {
            if (
              nativeEvent.contentSize.height -
                nativeEvent.layoutMeasurement.height -
                nativeEvent.contentOffset.y <
              250
            ) {
              getAllRestaurantsHandler();
            }
          }
        }}
        ListFooterComponent={() => (
          <>
            <ThemedText style={styles.headerText}>All Restaurants</ThemedText>
            <FlatList
              data={allRestaurants}
              renderItem={({item}) => (
                <CustomCard
                  cardStyle={styles.card}
                  imgStyle={styles.card}
                  title={item.title}
                  imgBorderRadius={10}
                  onPress={() =>
                    navigation.navigate('Restaurant', {id: item.id})
                  }
                />
              )}
            />
          </>
        )}
        renderItem={({item}) => {
          return (
            <View>
              <ThemedText style={styles.headerText}>{item.type}</ThemedText>
              <FlatList
                data={item.data}
                horizontal={true}
                renderItem={({item: i}) => (
                  <CustomCard
                    cardStyle={styles.horizontalScroll}
                    imgBorderRadius={10}
                    title={i.title}
                    onPress={() =>
                      navigation.navigate('Restaurant', {id: i.id})
                    }
                  />
                )}
              />
            </View>
          );
        }}
      />
      {currentOrderId ? (
        <Pressable
          onPress={() => {
            navigation.navigate('OrderTracker');
          }}
          style={styles.conditionalFooter}>
          <ThemedText>restaurant name</ThemedText>
          <View style={styles.orderStatus}>
            <ThemedText style={styles.footerText1}>Order status</ThemedText>
            <ThemedText style={styles.footerText}> OrderTime</ThemedText>
          </View>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    borderBottomWidth: 3,
    borderBottomColor: '#00000033',
  },
  topHeader: {
    flexDirection: 'row',
    padding: 2,
  },
  bottomHeader: {marginVertical: 10, margin: 0, paddingHorizontal: 5},
  leftHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  leftHeader1: {
    marginHorizontal: 15,
  },
  rightHeader: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  rightHeaderBtn: {marginHorizontal: 10},
  text: {fontSize: 10},
  text2: {fontWeight: 'bold', color: 'red', fontSize: 13},
  horizontalScroll: {padding: 5},
  card: {width: '100%', marginRight: 0, padding: 5},
  menuBtn: {alignSelf: 'center'},
  locationBtn: {height: 30},
  locationBtnText: {color: 'red'},
  headerText: {padding: 5, color: 'red'},
  conditionalFooter: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'grey',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 80,
  },
  footerText: {alignSelf: 'center'},
  footerText1: {alignSelf: 'center', flex: 1},
  orderStatus: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
