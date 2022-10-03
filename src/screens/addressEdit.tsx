import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  PermissionsAndroid,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import Container from '../components/Container';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import CustomInput from '../components/TextInput';
import {RootStackScreensProps} from '../navigators/root-stack';
// @ts-ignore
import BingMapsView from 'react-native-bing-maps';
import {AddressCard} from './addresses';
import Spacer from '../components/Spacer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface AddressCardProps {
  name?: string;
  details?: string;
  extDetails?: string;
  label?: string;
}

const AddressEdit = ({
  navigation,
  route,
}: RootStackScreensProps<'AddressEdit'>) => {
  const [location, setLocation] = useState<GeoPosition | null>(null);

  const hasPermission = useRef<Boolean>();

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        timeout: 15000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: false,
        showLocationDialog: true,
      },
    );
  };

  useEffect(() => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(status => {
      if (status) {
        getCurrentPosition();
        return (hasPermission.current = true);
      }
    });

    if (!hasPermission.current) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(status => {
        if (status === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentPosition();
          return (hasPermission.current = true);
        } else if (status === PermissionsAndroid.RESULTS.DENIED) {
          ToastAndroid.show(
            'Location permission denied by user.',
            ToastAndroid.LONG,
          );
          return (hasPermission.current = false);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          ToastAndroid.show(
            'Location permission revoked by user.',
            ToastAndroid.LONG,
          );
          return (hasPermission.current = false);
        }
      });
    }
  }, []);
  return (
    <Container
      containerStyle={styles.containerStyle}
      header={
        <CustomHeader
          title={!route.params.edit ? 'Add' : 'Edit'}
          onLeftPress={() => navigation.goBack()}
        />
      }
      footer={
        <CustomButton
          onPress={() => console.log('working')}
          containerStyle={styles.btnContainer}
          btnStyle={styles.btn}
          textStyle={styles.btnText}
          title="Save and continue"
        />
      }>
      <View>
        <BingMapsView
          mapLocation={{
            lat: location?.coords.latitude ?? 12.9010875,
            long: location?.coords.longitude ?? 77.6095084,
            zoom: 15,
          }}
          style={styles.map}
        />
      </View>
      <View style={styles.nonMap}>
        {!route.params.edit ? (
          <Text style={styles.boldText}>Add a new address</Text>
        ) : (
          <Text style={styles.boldText}>Edit your address</Text>
        )}
        <AddressCard editOnly={true} />
        <CustomInput
          placeholder="Apartment"
          containerStyle={styles.inputStyle1}
        />
        <Spacer height={20} />
        <Text style={styles.boldText}>Delivery instructions</Text>
        <Text>Please give us more information about your address</Text>
        <CustomInput
          placeholder="(Optional) Note to rider"
          containerStyle={styles.inputStyle1}
        />
        <Spacer height={20} />
        <Text style={styles.boldText}>Add a label</Text>
        <View style={styles.label}>
          <View style={styles.iconView}>
            <View style={styles.icon}>
              <MaterialIcons name="home" size={30} color="red" />
            </View>
            <Text>Home</Text>
          </View>
          <View style={styles.iconView}>
            <View style={styles.icon}>
              <MaterialIcons name="work" size={30} color="red" />
            </View>

            <Text>Work</Text>
          </View>
          <View style={styles.iconView}>
            <View style={styles.icon}>
              <MaterialIcons name="favorite-outline" size={30} color="red" />
            </View>

            <Text>Partner</Text>
          </View>
          <View style={styles.iconView}>
            <View style={styles.icon}>
              <MaterialIcons name="add" size={30} color="red" />
            </View>
            <Text>Other</Text>
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {margin: 0},
  inputStyle: {margin: 0},
  inputStyle1: {margin: 0, marginTop: 10},
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
  map: {
    height: 150,
  },
  nonMap: {
    margin: 10,
  },
  boldText: {fontWeight: 'bold', color: 'black', fontSize: 18},
  label: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 10},
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconView: {alignItems: 'center', justifyContent: 'center'},
});

export default AddressEdit;
