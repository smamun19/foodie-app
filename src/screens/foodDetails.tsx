import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../components/CustomHeader';
import FoodItem from '../components/FoodItemCardView';
import FoodItemHeader from '../components/FoodItemHeader';
import {RootStackScreensProps} from '../navigators/root-stack';
import {FOOD_DATA} from '../utils/testData';

const FoodDetails = ({navigation}: RootStackScreensProps<'Restaurant'>) => {
  return (
    <View>
      <CustomHeader
        headerStyle={styles.header}
        onLeftPress={() => navigation.navigate('Restaurant')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 5,
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 0,
  },
});

export default FoodDetails;
