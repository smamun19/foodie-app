import React, {useContext} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import CustomCard from '../components/CustomCard';
import Spacer from '../components/Spacer';

import {RootStackScreensProps} from '../navigators/root-stack';
import {UserContext} from '../services/userContext';

const Home = ({navigation}: RootStackScreensProps<'Home'>) => {
  const userInfo = useContext(UserContext);

  const logout = () => {
    userInfo?.logout();
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <View style={styles.leftHeader}>
            <Text>left header area</Text>
          </View>
          <View style={styles.rightHeader}>
            <Text>right header area</Text>
          </View>
        </View>
        <View style={styles.header}>
          <Text>This is the search area</Text>
        </View>
      </View>
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

        <View style={styles.header}>
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
  container: {flex: 1, margin: 10, padding: 5},
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topHeader: {
    flexDirection: 'row',
  },
  leftHeader: {
    flex: 1,
  },
  rightHeader: {},
  text: {fontSize: 50},
  horizontalScroll: {},
  card: {width: '100%'},
});

export default Home;
