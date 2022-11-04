import React, {useContext, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  UIManager,
  ScrollView,
  LayoutAnimation,
} from 'react-native';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import Spacer from '../components/Spacer';
import {RootStackScreensProps} from '../navigators/root-stack';
import {UserContext} from '../services/userContext';
import {Voucher} from '../utils/types/user';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';

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
  const {colors} = useTheme();
  return (
    <View style={styles.od}>
      <View style={styles.odChildren}>
        <Text style={{color: colors.text}}>Order number</Text>
        <Text style={{color: colors.text}}>{id}</Text>
      </View>
      <View style={styles.odChildren}>
        <Text style={{color: colors.text}}>Order from</Text>
        <Text style={{color: colors.text}}>{restaurant}</Text>
      </View>
      <View style={styles.odChildren}>
        <Text style={{color: colors.text}}>Delivery address</Text>
        <Text style={{color: colors.text}}>{address}</Text>
      </View>
      <View style={styles.odChildren}>
        <Text style={{color: colors.text}}>Total</Text>
        <Text style={{color: colors.text}}>Tk {total}</Text>
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
  const {colors} = useTheme();
  return (
    <View style={styles.od}>
      <View style={styles.odChildren}>
        <Text style={{color: colors.text}}>Delivery fee</Text>
        <Text style={{color: colors.text}}>Tk {deliveryFee}</Text>
      </View>
      {discount ? (
        <View style={styles.odChildren}>
          <Text style={{color: colors.text}}>Discount</Text>
          <Text style={{color: colors.text}}>Tk {discount}</Text>
        </View>
      ) : null}
      <View style={styles.odChildren}>
        <Text style={{color: colors.text}}>Incl. Tax</Text>
        <Text style={{color: colors.text}}>Tk {tax}</Text>
      </View>
      {voucher ? (
        <View style={styles.odChildren}>
          <Text style={{color: colors.text}}>Voucher:{voucher.name}</Text>
          <Text style={{color: colors.text}}>Tk {voucher.value}</Text>
        </View>
      ) : null}
      <View style={styles.odChildren}>
        <Text style={[styles.boldText, {color: colors.text}]}>
          Total(inc. VAT)
        </Text>
        <Text style={{color: colors.text}}>Tk {total}</Text>
      </View>
    </View>
  );
};

const OrderTracker = ({navigation}: RootStackScreensProps<'OrderTracker'>) => {
  const userInfo = useContext(UserContext);
  const [grow, setGrow] = useState<Boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const {colors} = useTheme();

  const ViewDetailsHanlder = () => {
    setGrow(!grow);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    scrollViewRef.current?.scrollToEnd();
  };

  return (
    <Container
      ref={scrollViewRef}
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
        <Text style={{color: colors.text}}>Estimated delivery time</Text>
        <Text style={[styles.estText, {color: colors.text}]}>25 - 35 mins</Text>
        <Image
          source={require('../assets/placeholder.jpg')}
          style={styles.img}
        />
        <Text style={[styles.orderStatusText, {color: colors.text}]}>
          Got your order {userInfo.name}!
        </Text>
      </View>
      <Spacer height={20} />
      <View>
        <Text style={[styles.boldText, {color: colors.text}]}>
          Order Details
        </Text>
        <OrderDetails
          address="Delivery address"
          id="das564faf"
          restaurant="Restaurant name"
          total={300}
        />
      </View>
      <Spacer height={10} />
      <Pressable onPress={ViewDetailsHanlder} style={styles.odChildren}>
        <Text style={[styles.boldText, {color: colors.text}]}>
          View details
        </Text>

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
        <View>
          <View>
            {userInfo.cartItem.map(e => {
              return (
                <View key={e.compositeId} style={styles.odChildren}>
                  <Text style={{color: colors.text}}>
                    {e.quantity}x {e.name} - {e.variation}
                  </Text>
                  <Text style={{color: colors.text}}>
                    Tk {e.price * e.quantity}
                  </Text>
                </View>
              );
            })}
            <View style={[styles.odChildren, styles.boldBorderTop]}>
              <Text style={[styles.boldText, {color: colors.text}]}>
                Subtotal
              </Text>
              <Text style={{color: colors.text}}>Tk 300</Text>
            </View>

            <ViewDetails
              total={300}
              deliveryFee={15}
              tax={12}
              voucher={userInfo.voucher}
            />
          </View>
          <Spacer height={20} />
          <Text style={[styles.boldText, {color: colors.text}]}>Paid with</Text>
          <View style={styles.odChildren}>
            <View style={styles.odChildren}>
              <MaterialIcons name="cash" size={18} />
              <Text style={[styles.paidWithText, {color: colors.text}]}>
                Cash on delivery
              </Text>
            </View>
            <Text style={{color: colors.text}}>Tk 300</Text>
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
  estText: {fontWeight: 'bold', fontSize: 30},
  img: {height: 100, width: 90, margin: 20},
  orderStatusText: {marginBottom: 20},
  boldText: {fontWeight: 'bold'},
  od: {borderBottomWidth: 0.5, borderBottomColor: '#6b6b6b'},
  odChildren: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  paidWithText: {marginHorizontal: 30},
  btnInnerStyle: {alignSelf: 'flex-start'},
  boldBorderTop: {
    borderTopWidth: 0.5,
    borderTopColor: '#6b6b6b',
    paddingTop: 10,
  },
});

export default OrderTracker;
