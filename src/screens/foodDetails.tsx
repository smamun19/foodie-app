import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import RadioButton from '../components/RadioButton';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import Spacer from '../components/Spacer';
import {RootStackScreensProps} from '../navigators/root-stack';

const FoodDetails = ({navigation}: RootStackScreensProps<'Restaurant'>) => {
  const array = [
    {name: 'small', price: 100},
    {name: 'medium', price: 150},
    {name: 'large', price: 200},
    {name: ' extra large', price: 300},
  ];

  const [check, setCheck] = useState<Record<string, any>>({});

  return (
    <Container
      header={
        <CustomHeader
          title="Details"
          onLeftPress={() => navigation.navigate('Restaurant')}
        />
      }>
      <Image
        style={styles.imageStyle}
        source={require('../assets/burger.jpeg')}
      />
      <View style={styles.view1}>
        <View style={styles.left}>
          <Text style={styles.titleText}>Food name</Text>
          <Text numberOfLines={2} style={styles.desText}>
            description
          </Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.priceText}>Tk {check.price}</Text>
        </View>
      </View>
      <Spacer />
      <View style={styles.view1}>
        <View style={styles.left}>
          <Text style={styles.titleText}>Variation</Text>
          <Text numberOfLines={2} style={styles.desText}>
            Select one
          </Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.priceText}>1 Required</Text>
        </View>
      </View>
      <View>
        <RadioButton check={check} setCheck={setCheck} data={array} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageStyle: {height: 150, width: '100%'},
  view1: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  left: {flex: 1, paddingRight: 10},
  right: {},
  titleText: {fontWeight: 'bold', color: 'black', fontSize: 15},
  desText: {},
  priceText: {},
});

export default FoodDetails;
