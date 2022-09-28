import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CardView from '../components/CardView';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {DrawerScreensProps} from '../navigators/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';

interface AddressCardProps {
  name?: string;
  details?: string;
  extDetails?: string;
  label?: string;
}
const AddressCard = ({
  details = 'Address',
  extDetails = 'none',
  name = 'Address name',
  label,
}: AddressCardProps) => {
  return (
    <CardView cardView={styles.cardView}>
      <View style={styles.left}>
        <MaterialIcons name="location-on" size={30} color="red" />
        <View style={styles.address}>
          <Text numberOfLines={1} style={styles.nameText}>
            {label ?? name}
          </Text>
          <Text numberOfLines={2}>{details}</Text>
          <Text numberOfLines={2}>Note to rider: {extDetails}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <MaterialIcons
          style={styles.editBtn}
          name="edit"
          size={30}
          color="red"
          onPress={() => console.log('working')}
        />
        <MaterialIcons
          onPress={() => console.log('working')}
          name="delete-outline"
          size={30}
          color="red"
        />
      </View>
    </CardView>
  );
};

const Addresses = ({navigation}: DrawerScreensProps<'Addresses'>) => {
  return (
    <Container
      footer={
        <CustomButton
          onPress={() => console.log('working')}
          containerStyle={styles.btnContainer}
          btnStyle={styles.btn}
          textStyle={styles.btnText}
          title="Add New Address"
        />
      }
      header={
        <CustomHeader
          title="Addresses"
          onLeftPress={() => navigation.navigate('Home')}
        />
      }>
      <AddressCard />
      <AddressCard />
      <AddressCard />
    </Container>
  );
};

const styles = StyleSheet.create({
  cardView: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  left: {
    flexDirection: 'row',
    flex: 1,
    paddingRight: 70,
  },
  right: {
    flexDirection: 'row',
  },
  address: {
    marginLeft: 10,
  },
  editBtn: {
    marginRight: 10,
  },
  btnContainer: {
    padding: 10,
    height: 60,
    borderTopWidth: 0.5,
    borderTopColor: '#6b6b6b',
    paddingHorizontal: 10,
  },
  btn: {
    backgroundColor: 'red',
    borderRadius: 5,
    width: '100%',
    height: '100%',
  },
  btnText: {color: 'white'},
  nameText: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Addresses;
