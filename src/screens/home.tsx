import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

import {RootStackScreensProps} from '../navigators/root-stack';

const Home = ({navigation}: RootStackScreensProps<'Home'>) => {
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
        <View style={styles.header}>
          <Text style={styles.text}>This is the main area</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>This is the main area</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>This is the main area</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>This is the main area</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>This is the main area</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>This is the main area</Text>
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
});

export default Home;
