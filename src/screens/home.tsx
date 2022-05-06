import React, {useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomCard from '../components/CustomCard';
import Spacer from '../components/Spacer';
import CustomInput from '../components/TextInput';

import {RootStackScreensProps} from '../navigators/root-stack';
import {UserContext} from '../services/userContext';

const Home = ({navigation}: RootStackScreensProps<'Home'>) => {
  const userInfo = useContext(UserContext);
  const {width} = useWindowDimensions();

  const epxtectedWidth = width * 0.9;

  const logout = () => {
    userInfo?.logout();
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <View style={styles.leftHeader}>
            <TouchableOpacity>
              <MaterialIcons name="list" size={22} color="red" />
            </TouchableOpacity>
            <View style={styles.leftHeader1}>
              <Text>Location Address</Text>
              <Text>Address</Text>
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
      <ScrollView>
        <ScrollView
          contentContainerStyle={styles.horizontalScroll}
          horizontal={true}>
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
        </ScrollView>
        <Spacer />
        <ScrollView
          contentContainerStyle={styles.horizontalScroll}
          horizontal={true}>
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
          <CustomCard title="hello" />
        </ScrollView>
        <Spacer />

        <View>
          <CustomCard
            cardStyle={styles.card}
            imgStyle={styles.card}
            title="hello"
          />
          <Spacer />
          <CustomCard
            cardStyle={styles.card}
            imgStyle={styles.card}
            title="hello"
          />
          <Spacer />
          <CustomCard
            cardStyle={styles.card}
            imgStyle={styles.card}
            title="hello"
          />
          <Spacer />
          <CustomCard
            cardStyle={styles.card}
            imgStyle={styles.card}
            title="hello"
            onPress={logout}
          />
          <Spacer />
        </View>
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
    padding: 5,
  },
  bottomHeader: {margin: 0, marginBottom: 10},
  leftHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  leftHeader1: {
    alignSelf: 'flex-start',
  },
  rightHeader: {flexDirection: 'row'},
  rightHeaderBtn: {marginHorizontal: 10},
  text: {fontSize: 50},
  horizontalScroll: {padding: 5},
  card: {width: '100%', marginRight: 0, padding: 5},
});

export default Home;
