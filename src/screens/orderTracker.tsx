import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import Spacer from '../components/Spacer';
import {RootStackScreensProps} from '../navigators/root-stack';
import {UserContext} from '../services/userContext';

interface OrderDetailsProps {
  id: string;
  restaurant: string;
  address: string;
  total: number;
}

const OrderDetails = ({address, id, restaurant, total}: OrderDetailsProps) => {
  return (
    <View>
      <View style={styles.odChildren}>
        <Text>Order number</Text>
        <Text>{id}</Text>
      </View>
      <View style={styles.odChildren}>
        <Text>Order from</Text>
        <Text>{restaurant}</Text>
      </View>
      <View style={styles.odChildren}>
        <Text>Delivery address</Text>
        <Text>{address}</Text>
      </View>
      <View style={styles.odChildren}>
        <Text>Total</Text>
        <Text>Tk {total}</Text>
      </View>
    </View>
  );
};

const OrderTracker = ({navigation}: RootStackScreensProps<'OrderTracker'>) => {
  const userInfo = useContext(UserContext);
  return (
    <Container
      containerStyle={styles.containerStyle}
      header={
        <CustomHeader
          title="Your order"
          onLeftPress={() => navigation.goBack()}
          name="help"
          color="red"
          size={30}
          onRightPress={() => navigation.navigate('Drawer', {screen: 'Help'})}
        />
      }>
      <View style={styles.topView}>
        <Text>Estimated delivery time</Text>
        <Text style={styles.estText}>25 - 35 mins</Text>
        <Image
          source={require('../assets/placeholder.jpg')}
          style={styles.img}
        />
        <Text style={styles.orderStatusText}>
          Got your order {userInfo.name}!
        </Text>
      </View>
      <Spacer height={20} />
      <View>
        <Text style={styles.boldText}>Order Details</Text>
        <OrderDetails
          address="Delivery address"
          id="das564faf"
          restaurant="Restaurant name"
          total={300}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {margin: 10},
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#6b6b6b',
  },
  estText: {fontWeight: 'bold', fontSize: 30, color: 'black'},
  img: {height: 100, width: 90, margin: 20},
  orderStatusText: {marginBottom: 20},
  boldText: {fontWeight: 'bold', color: 'black'},
  odChildren: {flexDirection: 'row', justifyContent: 'space-between'},
});

export default OrderTracker;
