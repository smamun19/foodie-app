import React, {useContext, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import Spacer from '../components/Spacer';
import {RootStackScreensProps} from '../navigators/root-stack';
import {UserContext} from '../services/userContext';
import {Voucher} from '../utils/types/user';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface OrderDetailsProps {
  id: string;
  restaurant: string;
  address: string;
  total: number;
}

interface ViewDetailsProps {
  deliveryFee: number;
  discount?: number;
  tax: number;
  voucher?: Voucher;
  total: number;
}

const OrderDetails = ({address, id, restaurant, total}: OrderDetailsProps) => {
  return (
    <View style={styles.od}>
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

const ViewDetails = ({
  deliveryFee,
  tax,
  voucher,
  discount,
  total,
}: ViewDetailsProps) => {
  return (
    <View style={styles.od}>
      <View style={styles.odChildren}>
        <Text>Delivery fee</Text>
        <Text>Tk {deliveryFee}</Text>
      </View>
      {discount ? (
        <View style={styles.odChildren}>
          <Text>Discount</Text>
          <Text>Tk {discount}</Text>
        </View>
      ) : null}
      <View style={styles.odChildren}>
        <Text>Incl. Tax</Text>
        <Text>Tk {tax}</Text>
      </View>
      {voucher ? (
        <View style={styles.odChildren}>
          <Text>Voucher:{voucher.name}</Text>
          <Text>Tk {voucher.value}</Text>
        </View>
      ) : null}
      <View style={styles.odChildren}>
        <Text style={styles.boldText}>Total(inc. VAT)</Text>
        <Text>Tk {total}</Text>
      </View>
    </View>
  );
};

const OrderTracker = ({navigation}: RootStackScreensProps<'OrderTracker'>) => {
  const userInfo = useContext(UserContext);
  const [grow, setGrow] = useState<Boolean>(false);

  const ViewDetailsHanlder = () => {
    setGrow(!grow);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

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
      <Spacer height={10} />
      <Pressable onPress={ViewDetailsHanlder} style={styles.odChildren}>
        <Text style={styles.boldText}>View details</Text>

        <MaterialIcons
          name={
            grow
              ? 'arrow-up-drop-circle-outline'
              : 'arrow-down-drop-circle-outline'
          }
          size={18}
          color="red"
        />
      </Pressable>
      {grow && (
        <View style={{}}>
          <View>
            {userInfo.cartItem.map(e => {
              return (
                <View key={e.compositeId} style={styles.odChildren}>
                  <Text>
                    {e.quantity}x {e.name} - {e.variation}
                  </Text>
                  <Text>Tk {e.price * e.quantity}</Text>
                </View>
              );
            })}
            <Text style={styles.boldText}>Subtotal</Text>
            <ViewDetails
              total={300}
              deliveryFee={15}
              tax={12}
              voucher={userInfo.voucher}
            />
          </View>
          <Spacer height={20} />
          <Text style={styles.boldText}>Paid with</Text>
          <View style={styles.odChildren}>
            <View style={styles.odChildren}>
              <MaterialIcons name="cash" size={18} />
              <Text style={styles.paidWithText}>Cash on delivery</Text>
            </View>
            <Text>Tk 300</Text>
          </View>
        </View>
      )}
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
  od: {borderBottomWidth: 0.5, borderBottomColor: '#6b6b6b'},
  odChildren: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  paidWithText: {marginHorizontal: 30},
  btnInnerStyle: {alignSelf: 'flex-start'},
});

export default OrderTracker;
