import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CardView from '../components/CardView';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {DrawerScreensProps} from '../navigators/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface AddressCardProps {
  name?: string;
  details?: string;
  extDetails?: string;
}
const AddressCard = ({
  details = 'Address',
  extDetails = 'none',
  name = 'Address name',
}: AddressCardProps) => {
  return (
    <CardView cardView={styles.cardView}>
      <View style={styles.left}>
        <MaterialIcons name="location-on" size={30} color="red" />
        <View style={styles.address}>
          <Text>{name}</Text>
          <Text>{details}</Text>
          <Text>Note to rider: {extDetails}</Text>
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
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
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
});

export default Addresses;
