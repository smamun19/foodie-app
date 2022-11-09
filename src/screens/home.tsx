import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useContext, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import CustomCard from '../components/CustomCard';
import Spacer from '../components/Spacer';
import CustomInput from '../components/TextInput';
import ThemedText from '../components/ThemedText';
import {DrawerScreensProps} from '../navigators/drawer';
import {getRestaurants} from '../services/public';
import {UserContext} from '../services/userContext';
import {Restaurants} from '../utils/types/user';

const Home = ({navigation}: DrawerScreensProps<'Home'>) => {
  const {address} = useContext(UserContext);
  const [restaurants, setRestaurants] = useState<Restaurants[]>();

  useFocusEffect(
    useCallback(() => {
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
    }, []),
  );

  if (!restaurants) {
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
      </View>
    );
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
      <ScrollView>
        {restaurants.map(item => {
          return (
            <View key={item.type}>
              <ThemedText>{item.type}</ThemedText>
              <FlatList
                data={item.data}
                horizontal={true}
                renderItem={({item: i}) => (
                  <CustomCard
                    cardStyle={styles.horizontalScroll}
                    imgBorderRadius={10}
                    title={i.title}
                    onPress={() => navigation.navigate('Restaurant')}
                  />
                )}
              />
            </View>
          );
        })}
      </ScrollView>
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
  text3: {fontWeight: 'bold', color: 'red', fontSize: 13, padding: 5},
  horizontalScroll: {padding: 5},
  sectionHeader: {color: 'red', padding: 5},
  card: {width: '100%', marginRight: 0, padding: 5},
  menuBtn: {alignSelf: 'center'},
  locationBtn: {height: 30},
  locationBtnText: {color: 'red'},
});

export default Home;
