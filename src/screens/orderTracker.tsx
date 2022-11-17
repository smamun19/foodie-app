import React, {useCallback, useContext, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Pressable,
  Platform,
  UIManager,
  ScrollView,
  LayoutAnimation,
  Alert,
} from 'react-native';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import Spacer from '../components/Spacer';
import {RootStackScreensProps} from '../navigators/root-stack';
import {UserContext} from '../services/userContext';
import {OrderDetails, Voucher} from '../utils/types/user';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ThemedText from '../components/ThemedText';
import {useFocusEffect} from '@react-navigation/native';
import {currentOrder} from '../services/user';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface OrderInfoProps {
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

const OrderInfo = ({address, id, restaurant, total}: OrderInfoProps) => {
  return (
    <View style={styles.od}>
      <View style={styles.odChildren}>
        <ThemedText>Order number</ThemedText>
        <ThemedText>{id}</ThemedText>
      </View>
      <View style={styles.odChildren}>
        <ThemedText>Order from</ThemedText>
        <ThemedText>{restaurant}</ThemedText>
      </View>
      <View style={styles.odChildren}>
        <ThemedText>Delivery address</ThemedText>
        <ThemedText>{address}</ThemedText>
      </View>
      <View style={styles.odChildren}>
        <ThemedText>Total</ThemedText>
        <ThemedText>Tk {total}</ThemedText>
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
        <ThemedText>Delivery fee</ThemedText>
        <ThemedText>Tk {deliveryFee}</ThemedText>
      </View>
      {discount ? (
        <View style={styles.odChildren}>
          <ThemedText>Discount</ThemedText>
          <ThemedText>Tk {discount}</ThemedText>
        </View>
      ) : null}
      <View style={styles.odChildren}>
        <ThemedText>Incl. Tax</ThemedText>
        <ThemedText>Tk {tax}</ThemedText>
      </View>
      {voucher ? (
        <View style={styles.odChildren}>
          <ThemedText>Voucher:{voucher.name}</ThemedText>
          <ThemedText>-Tk {voucher.value}</ThemedText>
        </View>
      ) : null}
      <View style={styles.odChildren}>
        <ThemedText style={styles.boldText}>Total(inc. VAT)</ThemedText>
        <ThemedText>Tk {total}</ThemedText>
      </View>
    </View>
  );
};

const OrderTracker = ({navigation}: RootStackScreensProps<'OrderTracker'>) => {
  const userInfo = useContext(UserContext);
  const [grow, setGrow] = useState<Boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentOrderDetails, setCurrentOrderDetials] =
    useState<OrderDetails>();

  useFocusEffect(
    useCallback(() => {
      if (!userInfo.currentOrderId) {
        return Alert.alert(
          'Error!',
          'Unable to process your request at this moment',
          undefined,
          {
            cancelable: true,
          },
        );
      }
      currentOrder(userInfo.currentOrderId, userInfo.token)
        .then(result => setCurrentOrderDetials(result.details))
        .catch(() => {
          Alert.alert(
            'Error!',
            'Unable to process your request at this moment',
            undefined,
            {
              cancelable: true,
            },
          );
        });
    }, [userInfo.currentOrderId, userInfo.token]),
  );

  if (!currentOrderDetails) {
    return null;
  }

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
          onLeftPress={() => navigation.navigate('Drawer')}
          name="help"
          color="red"
          size={30}
          onRightPress={() => navigation.navigate('Drawer', {screen: 'Help'})}
        />
      }>
      <View style={styles.topView}>
        <ThemedText>Estimated delivery time</ThemedText>
        <ThemedText style={styles.estText}>25 - 35 mins</ThemedText>
        <Image
          source={require('../assets/placeholder.jpg')}
          style={styles.img}
        />
        <ThemedText style={styles.orderStatusText}>
          Got your order {userInfo.name}!
        </ThemedText>
      </View>
      <Spacer height={20} />
      <View>
        <ThemedText style={styles.boldText}>Order Details</ThemedText>
        <OrderInfo
          address="Delivery address"
          id={currentOrderDetails.id}
          restaurant={currentOrderDetails.restaurant.title}
          total={currentOrderDetails.totalFee}
        />
      </View>
      <Spacer height={10} />
      <Pressable onPress={ViewDetailsHanlder} style={styles.odChildren}>
        <ThemedText style={styles.boldText}>View details</ThemedText>

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
            {currentOrderDetails.items.map(e => {
              return (
                <View
                  key={`${e.itemId}-${e.orderId}-${e.price}`}
                  style={styles.odChildren}>
                  <ThemedText>
                    {e.quantity}x {e.item.name}
                    {e.variation ? `- ${e.variation}` : null}
                  </ThemedText>
                  <ThemedText>Tk {e.price * e.quantity}</ThemedText>
                </View>
              );
            })}
            <View style={[styles.odChildren, styles.boldBorderTop]}>
              <ThemedText style={styles.boldText}>Subtotal</ThemedText>
              <ThemedText>Tk {currentOrderDetails.subTotalFee}</ThemedText>
            </View>

            <ViewDetails
              total={currentOrderDetails.totalFee}
              deliveryFee={15}
              tax={12}
              voucher={currentOrderDetails.voucher}
            />
          </View>
          <Spacer height={20} />
          <ThemedText style={styles.boldText}>Paid with</ThemedText>
          <View style={styles.odChildren}>
            <View style={styles.odChildren}>
              <MaterialIcons name="cash" size={18} />
              <ThemedText style={styles.paidWithText}>
                Cash on delivery
              </ThemedText>
            </View>
            <ThemedText>{currentOrderDetails.totalFee}</ThemedText>
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
