import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  SectionList,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomCard from '../components/CustomCard';
import Spacer from '../components/Spacer';
import CustomInput from '../components/TextInput';
import {DrawerScreensProps} from '../navigators/drawer';
import {DATA} from '../utils/testData';

const Home = ({navigation}: DrawerScreensProps<'Home'>) => {
  const {width} = useWindowDimensions();

  const epxtectedWidth = width * 0.9;

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
              <Text style={styles.text2}>Location Address</Text>
              <Text style={styles.text}>Address</Text>
            </View>
          </View>
          <View style={styles.rightHeader}>
            <TouchableOpacity style={styles.rightHeaderBtn}>
              <MaterialIcons name="favorite" size={22} color="red" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="shopping-cart" size={22} color="red" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <CustomInput
            inputStyle={{
              width: epxtectedWidth,
            }}
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
  bottomHeader: {margin: 0, marginBottom: 10},
  leftHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  leftHeader1: {
    marginLeft: 15,
  },
  rightHeader: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  rightHeaderBtn: {marginHorizontal: 10},
  text: {color: 'black', fontSize: 10},
  text2: {fontWeight: 'bold', color: 'red', fontSize: 13},
  text3: {fontWeight: 'bold', color: 'red', fontSize: 13, padding: 5},
  horizontalScroll: {padding: 5},
  sectionHeader: {color: 'red', padding: 5},
  card: {width: '100%', marginRight: 0, padding: 5},
  menuBtn: {alignSelf: 'center'},
});

export default Home;
