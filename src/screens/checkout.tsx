import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CardView from '../components/CardView';
import Container from '../components/Container';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import Divider from '../components/Divider';
import {RootStackScreensProps} from '../navigators/root-stack';
import {UserContext} from '../services/userContext';

const Checkout = ({navigation, route}: RootStackScreensProps<'Checkout'>) => {
  const userInfo = useContext(UserContext);

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
          <View style={styles.subTotal}>
            <Text style={styles.footerText}>Total</Text>
            <Text style={styles.footerText}>Tk {route.params.totalAmount}</Text>
          </View>

          <CustomButton
            onPress={() => console.log('Go to final page')}
            containerStyle={styles.btn}
            textStyle={styles.btnText}
            title="Place order"
          />
        </View>
      }>
      <View style={styles.mid}>
        <CardView>
          <Text>hello there</Text>
          <Text>hello there</Text>
          <Divider />
          <Text>hello there</Text>
          <Text>hello there</Text>
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
});

export default Checkout;
