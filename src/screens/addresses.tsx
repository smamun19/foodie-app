import React, {useCallback, useContext, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import CardView from '../components/CardView';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {DrawerScreensProps} from '../navigators/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import {Address} from '../utils/types/user';
import {getAddress, removeAddress} from '../services/user';
import {UserContext} from '../services/userContext';
import {useFocusEffect} from '@react-navigation/native';

interface AddressCardProps {
  name?: string;
  details?: string;
  extDetails?: string;
  deliveryInstructions?: string;
  label?: string;
  onEditPress?: () => void;
  onDeletePress?: () => void;
  editOnly?: boolean;
}
export const AddressCard = ({
  details,
  deliveryInstructions,
  name,
  onEditPress,
  onDeletePress,
  label,
  editOnly,
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
          {!editOnly && (
            <Text numberOfLines={2}>
              Note to rider: {deliveryInstructions ?? 'none'}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.right}>
        <MaterialIcons
          style={styles.editBtn}
          name="edit"
          size={30}
          color="red"
          onPress={onEditPress}
        />
        {!editOnly && (
          <MaterialIcons
            onPress={onDeletePress}
            name="delete-outline"
            size={30}
            color="red"
          />
        )}
      </View>
    </CardView>
  );
};

const Addresses = ({navigation}: DrawerScreensProps<'Addresses'>) => {
  const userInfo = useContext(UserContext);
  const [addresses, setAddresses] = useState<Address[]>();

  const removeAddressHandler = async (id: number) => {
    try {
      const {message, statusCode, details} = await removeAddress(
        id,
        userInfo.token,
      );
      if (statusCode !== 200) {
        console.log(statusCode);
        return Alert.alert('Error!', message, undefined, {
          cancelable: true,
        });
      }
      return setAddresses(details);
    } catch (error) {
      return Alert.alert(
        'Error!',
        'Unable to process your request at this moment',
        undefined,
        {
          cancelable: true,
        },
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAddress(userInfo.token)
        .then(result => setAddresses(result.details))
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
    }, [userInfo.token]),
  );

  return (
    <Container
      footer={
        <CustomButton
          onPress={() => navigation.navigate('AddressEdit', {edit: false})}
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
      {addresses?.map(item => {
        return (
          <AddressCard
            key={item.id}
            name={item.name}
            details={item.details}
            deliveryInstructions={item.deliveryInstructions}
            extDetails={item.extDetails}
            label={item.label}
            onDeletePress={() => removeAddressHandler(item.id)}
            onEditPress={() =>
              navigation.navigate('AddressEdit', {
                edit: true,
                address: {...item},
              })
            }
          />
        );
      })}
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
