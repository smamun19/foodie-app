import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CartCard from '../components/CartCard';
import Container from '../components/Container';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import Spacer from '../components/Spacer';
import {RootStackScreensProps} from '../navigators/root-stack';
import {UserContext} from '../services/userContext';

const Cart = ({navigation}: RootStackScreensProps<'Restaurant'>) => {
  const userInfo = useContext(UserContext);

  console.log(userInfo?.cartItem);

  return (
    <Container
      header={
        <CustomHeader
          title="Cart"
          onLeftPress={() => navigation.navigate('Restaurant')}
        />
      }
      footer={
        <View style={styles.footer}>
          <View style={styles.subTotal}>
            <Text>Total</Text>
            <Text>Tk 315</Text>
          </View>

          <CustomButton
            onPress={() => console.log('Go to final page')}
            containerStyle={styles.btn}
            title="Review payment and address"
          />
        </View>
      }>
      <View style={styles.mid}>
        <View style={styles.card}>
          <Image
            style={styles.img}
            source={require('../assets/placeholder.jpg')}
          />
          <View>
            <Text>Estimated delivery</Text>
            <Text>ASAP (40 min)</Text>
          </View>
        </View>
        <Spacer height={30} />
        <CartCard />
        <Spacer height={30} />
        <View style={styles.subTotal}>
          <Text>Subtotal</Text>
          <Text>Tk 300</Text>
        </View>
        <Spacer height={10} />

        <View style={styles.subTotal}>
          <Text>deliveryFee</Text>
          <Text>Tk 15</Text>
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
  footer: {paddingHorizontal: 5},
  card: {
    borderColor: '#6b6b6b',
    borderRadius: 1,
    height: 80,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  img: {height: 50, width: 50},
  subTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Cart;
