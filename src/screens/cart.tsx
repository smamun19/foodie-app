import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CartCard from '../components/CartCard';
import Container from '../components/Container';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import Spacer from '../components/Spacer';
import ThemedText from '../components/ThemedText';
import {RootStackScreensProps} from '../navigators/root-stack';
import {UserContext} from '../services/userContext';

const Cart = ({navigation}: RootStackScreensProps<'Cart'>) => {
  const userInfo = useContext(UserContext);
  const voucherValue = userInfo.voucher?.value ?? 0;

  const deliveryFee = 15;

  const removeVoucher = () => {
    userInfo.removeVoucher();
  };

  const subTotal = useMemo(() => {
    return userInfo.cartItem.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.price * currentValue.quantity;
    }, 0);
  }, [userInfo.cartItem]);

  const totalAmount = useMemo(() => {
    return subTotal + deliveryFee - voucherValue;
  }, [subTotal, voucherValue]);

  if (userInfo.cartItem.length === 0) {
    return (
      <Container
        header={
          <CustomHeader title="Cart" onLeftPress={() => navigation.goBack()} />
        }>
        <View style={styles.emptyCart}>
          <ThemedText>Hungry?</ThemedText>
          <ThemedText>You havent added anything to your cart!</ThemedText>
          <CustomButton
            onPress={() => navigation.goBack()}
            title="Browse"
            btnStyle={styles.browseBtn}
          />
        </View>
      </Container>
    );
  }

  return (
    <Container
      header={
        <CustomHeader title="Cart" onLeftPress={() => navigation.goBack()} />
      }
      footer={
        <View style={styles.footer}>
          <View style={styles.subTotal}>
            <ThemedText style={styles.footerText}>Total</ThemedText>
            <ThemedText style={styles.footerText}>Tk {totalAmount}</ThemedText>
          </View>

          <CustomButton
            onPress={() =>
              navigation.navigate('Checkout', {
                totalAmount: totalAmount,
                deliveryFee: deliveryFee,
                subTotal: subTotal,
              })
            }
            containerStyle={styles.btn}
            textStyle={styles.btnText}
            title="Review payment and address"
          />
        </View>
      }>
      <View style={styles.mid}>
        <View style={styles.card}>
          <Image
            style={styles.img}
            source={require('../assets/food_delivery.png')}
          />
          <View>
            <ThemedText>Estimated delivery</ThemedText>
            <ThemedText style={styles.bold}>ASAP (40 min)</ThemedText>
          </View>
        </View>
        <Spacer height={30} />
        {userInfo.cartItem.map(e => (
          <CartCard
            name={e.name}
            itemId={e.itemId}
            price={e.price}
            quantity={e.quantity}
            variation={e.variation}
            compositeId={e.compositeId}
            key={e.compositeId}
          />
        ))}
        <Spacer height={10} />
        <CustomButton
          btnStyle={styles.addMoreBtnStyle}
          containerStyle={styles.addMoreBtnContainer}
          textStyle={styles.addMoreBtnText}
          title="Add more items"
        />
        <Spacer height={30} />
        <View style={styles.subTotal}>
          <ThemedText style={styles.bold}>Subtotal</ThemedText>
          <ThemedText style={styles.bold}>Tk {subTotal}</ThemedText>
        </View>
        <Spacer height={10} />

        <View style={styles.subTotal}>
          <ThemedText>Delivery fee</ThemedText>
          <ThemedText>Tk {deliveryFee}</ThemedText>
        </View>
        <Spacer height={10} />
        <View>
          {!userInfo.voucher ? (
            <View style={styles.voucherBody}>
              <MaterialIcons name="redeem" color={'red'} size={20} />
              <Spacer height={0} width={10} />
              <CustomButton
                btnStyle={styles.addMoreBtnStyle}
                containerStyle={styles.addMoreBtnContainer}
                textStyle={styles.addMoreBtnText}
                onPress={() => navigation.navigate('Voucher')}
                title="Apply a voucher"
              />
            </View>
          ) : (
            <View style={styles.voucher}>
              <View style={styles.voucherBody}>
                <MaterialIcons name="loyalty" color={'red'} size={20} />
                <Spacer height={0} width={10} />
                <ThemedText style={styles.voucherNameText}>
                  {userInfo.voucher.name}
                </ThemedText>
                <Spacer height={0} width={10} />
                <CustomButton
                  btnStyle={styles.addMoreBtnStyle}
                  containerStyle={styles.addMoreBtnContainer}
                  textStyle={styles.addMoreBtnText}
                  onPress={removeVoucher}
                  title="Remove"
                />
              </View>
              <View style={styles.voucherValue}>
                <ThemedText style={styles.voucherValueText}>
                  - Tk {userInfo.voucher.value}
                </ThemedText>
              </View>
            </View>
          )}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mid: {padding: 5},
  btn: {
    backgroundColor: 'red',
    borderRadius: 5,
  },
  footer: {
    padding: 5,
    borderRadius: 5,
  },
  card: {
    borderColor: '#6b6b6b',
    borderRadius: 1,
    height: 80,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  img: {height: 50, width: 50, borderRadius: 20},
  subTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bold: {fontWeight: 'bold'},
  footerText: {fontWeight: 'bold', paddingVertical: 5},
  addMoreBtnText: {color: 'red'},
  addMoreBtnStyle: {
    width: 'auto',
  },
  addMoreBtnContainer: {
    height: 25,
    width: 'auto',
    alignItems: 'flex-start',
  },
  voucher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  voucherBody: {flexDirection: 'row', alignItems: 'center'},
  voucherNameText: {fontWeight: 'bold'},
  voucherValueText: {color: 'red', fontWeight: 'bold'},
  voucherValue: {
    backgroundColor: '#deadad',
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 6,
  },
  emptyCart: {justifyContent: 'center', alignItems: 'center', padding: 5},
  browseBtn: {
    backgroundColor: 'red',
    width: 80,
    marginVertical: 10,
    height: 30,
  },
  btnText: {color: 'white'},
});

export default Cart;
