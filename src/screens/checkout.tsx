import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import CardView from '../components/CardView';
import Container from '../components/Container';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RootStackScreensProps} from '../navigators/root-stack';
import {UserContext} from '../services/userContext';
import Spacer from '../components/Spacer';
import Divider from '../components/Divider';
import BingMapsView from 'react-native-bing-maps';

const Checkout = ({navigation, route}: RootStackScreensProps<'Checkout'>) => {
  const userInfo = useContext(UserContext);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <Container
      header={
        <CustomHeader
          title="Checkout"
          onLeftPress={() => navigation.navigate('Cart')}
        />
      }
      footer={
        <View style={styles.footer}>
          <Text style={styles.tcBody}>
            By completing this order, I agree to all{' '}
            <Text style={styles.tc}>terms & conditions</Text>
          </Text>
          <View style={styles.subTotal}>
            <Text style={styles.footerText}>Total</Text>
            <Text style={styles.footerText}>Tk {route.params.totalAmount}</Text>
          </View>
          <CustomButton
            containerStyle={styles.btn}
            textStyle={styles.btnText}
            title="Place order"
            onPress={() => navigation.navigate('OrderTracker')}
          />
        </View>
      }>
      <View style={styles.mid}>
        <CardView cardView={styles.mapContainer}>
          <View style={styles.address}>
            <View style={styles.addressBody}>
              <MaterialIcons name="place" size={20} color="red" />
              <Text style={styles.bold}>Delivery address</Text>
            </View>
            <MaterialIcons
              onPress={() =>
                navigation.navigate('Drawer', {screen: 'Addresses'})
              }
              name="mode-edit"
              size={20}
              color="red"
            />
          </View>

          {userInfo.address.length !== 0 ? (
            <View>
              <View>
                <BingMapsView
                  mapLocation={{
                    lat: userInfo.address[0].lat,
                    long: userInfo.address[0].long,
                    zoom: 15,
                  }}
                  style={styles.map}
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddressEdit', {
                    address: userInfo.address[0],
                    edit: true,
                  })
                }>
                <Text style={styles.bold}>
                  {userInfo.address[0].label ?? userInfo.address[0].name}
                </Text>
                <Text>{userInfo.address[0].details}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <CustomButton
              containerStyle={styles.locationBtn}
              textStyle={styles.locationBtnText}
              title="Add an address"
              onPress={() => navigation.navigate('AddressEdit', {edit: false})}
            />
          )}
        </CardView>
        <CardView cardView={styles.contactless}>
          <Text numberOfLines={3} style={styles.textWrap}>
            Contactless delivery: switch to online payment for this option
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </CardView>
        <Spacer height={20} />
        <CardView>
          <View style={styles.address}>
            <View style={styles.addressBody}>
              <MaterialIcons name="payment" size={20} color="red" />
              <Text style={styles.bold}>Payment method</Text>
            </View>
            <MaterialIcons name="mode-edit" size={20} color="red" />
          </View>
          <View style={styles.address}>
            <View style={styles.addressBody}>
              <MaterialIcons name="money" size={20} color="red" />
              <Text style={styles.bold}>Cash</Text>
            </View>
            <Text style={styles.bold}>Tk {route.params.totalAmount}</Text>
          </View>
        </CardView>
        <Spacer height={20} />
        <CardView>
          <View style={styles.addressBody}>
            <MaterialIcons name="list-alt" size={20} color="red" />
            <Text style={styles.bold}>Order summery</Text>
          </View>
          {userInfo.cartItem.map(e => {
            return (
              <View key={e.compositeId} style={styles.address}>
                <Text style={styles.bold}>
                  {e.quantity}x {e.name} - {e.variation}
                </Text>
                <Text style={styles.bold}>Tk {e.price * e.quantity}</Text>
              </View>
            );
          })}

          <Divider />
          <View style={styles.address}>
            <Text style={styles.bold}>Subtotal</Text>
            <Text style={styles.bold}>Tk {route.params.subTotal}</Text>
          </View>
          <View style={styles.address}>
            <Text style={styles.bold}>Delivery fee</Text>
            <Text style={styles.bold}>Tk {route.params.deliveryFee}</Text>
          </View>
          {userInfo.voucher && (
            <View style={styles.address}>
              <Text style={styles.bold}>Voucher: {userInfo.voucher.name}</Text>
              <Text style={styles.bold}>- Tk {userInfo.voucher.value}</Text>
            </View>
          )}
        </CardView>
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
  footer: {padding: 5, borderRadius: 5},
  card: {
    borderColor: '#6b6b6b',
    borderRadius: 1,
    height: 80,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  subTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {fontWeight: 'bold', paddingVertical: 5, color: 'black'},
  btnText: {color: 'white'},
  mapContainer: {},
  map: {
    height: 150,
  },
  address: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  addressBody: {flexDirection: 'row'},
  bold: {fontWeight: 'bold'},
  contactless: {flexDirection: 'row', justifyContent: 'space-between'},
  textWrap: {flexWrap: 'wrap', width: '70%'},
  tc: {color: 'red'},
  tcBody: {paddingVertical: 20},
  locationBtn: {height: 30},
  locationBtnText: {color: 'red'},
});

export default Checkout;
