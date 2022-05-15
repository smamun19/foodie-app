import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import FoodItem from '../components/FoodItemCardView';
import FoodItemHeader from '../components/FoodItemHeader';
import {RootStackScreensProps} from '../navigators/root-stack';
import {FOOD_DATA} from '../utils/testData';

const Restaurant = ({navigation}: RootStackScreensProps<'Restaurant'>) => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={FOOD_DATA}
        ListHeaderComponent={FoodItemHeader}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  headerText: {fontWeight: 'bold', fontSize: 20, color: 'black', padding: 5},
});

export default Restaurant;
