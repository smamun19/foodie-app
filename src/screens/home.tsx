import {useTheme} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import CustomCard from '../components/CustomCard';
import Spacer from '../components/Spacer';
import CustomInput from '../components/TextInput';
import {DrawerScreensProps} from '../navigators/drawer';
import {UserContext} from '../services/userContext';
import {DATA} from '../utils/testData';

const Home = ({navigation}: DrawerScreensProps<'Home'>) => {
  const {address} = useContext(UserContext);
  const {colors} = useTheme();

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
                  <Text style={styles.text2}>
                    {address[0].label ?? address[0].name}
                  </Text>
                  <Text style={[styles.text, {color: colors.text}]}>
                    {address[0].details}
                  </Text>
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
      <SectionList
        sections={DATA}
        keyExtractor={e => e.id}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({section, item}) =>
          section.title !== 'ALL' ? (
            <FlatList
              //@ts-ignore
              data={item.data}
              horizontal={true}
              keyExtractor={e => e.id}
              //@ts-ignore
              key={item.data.id}
              renderItem={({item: i}) => (
                <CustomCard
                  cardStyle={styles.horizontalScroll}
                  imgBorderRadius={10}
                  title={i.title}
                  onPress={() => navigation.navigate('Restaurant')}
                />
              )}
            />
          ) : (
            <CustomCard
              cardStyle={styles.card}
              imgStyle={styles.card}
              title={item.title}
              imgBorderRadius={10}
            />
          )
        }
      />
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
