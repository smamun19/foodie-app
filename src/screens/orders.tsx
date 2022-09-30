import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import CardView from '../components/CardView';
import Container from '../components/Container';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import Spacer from '../components/Spacer';
import {DrawerScreensProps} from '../navigators/drawer';

const OrderCard = () => {
  return (
    <CardView cardView={styles.cardView}>
      <Pressable>
        <View style={styles.row1}>
          <View style={styles.row1Left}>
            <Image
              style={styles.imageStyle}
              source={require('../assets/burger.jpeg')}
            />
            <View style={styles.row1Right}>
              <Text style={styles.boldText}>Restaurant name</Text>
              <Text>Food list</Text>
            </View>
          </View>
          <Text>Tk 267</Text>
        </View>
        <Spacer height={10} />
        <View style={styles.row2}>
          <Text style={styles.row2Left}>Order time</Text>
          <CustomButton
            containerStyle={styles.btn}
            textStyle={styles.btnText}
            title="Select items to reorder"
          />
        </View>
      </Pressable>
    </CardView>
  );
};

const Orders = ({navigation}: DrawerScreensProps<'Orders'>) => {
  return (
    <Container
      containerStyle={styles.containerStyle}
      header={
        <CustomHeader
          title="Orders"
          onLeftPress={() => navigation.navigate('Home')}
        />
      }>
      <Text style={styles.topText}>Past orders</Text>
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {margin: 10},
  cardView: {padding: 10, marginBottom: 20},
  topText: {padding: 10, fontWeight: 'bold', color: 'black', fontSize: 18},
  imageStyle: {height: 80, width: 80},
  row1: {flexDirection: 'row'},
  row2: {flexDirection: 'row', alignItems: 'center'},
  row1Left: {flexDirection: 'row', flex: 1},
  row1Right: {marginLeft: 20, marginRight: 80},
  row2Left: {flex: 1},
  btn: {
    backgroundColor: 'red',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
  },
  btnText: {color: 'white'},
  boldText: {fontWeight: 'bold', color: 'black'},
});

export default Orders;
