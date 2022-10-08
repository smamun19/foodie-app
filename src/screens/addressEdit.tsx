import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Modal,
  ModalProps,
  PermissionsAndroid,
  Pressable,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {addAddress, editAddress} from '../services/user';
import {UserContext} from '../services/userContext';

export interface Props extends ModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
  name?: string;
  setName?: React.Dispatch<React.SetStateAction<string | undefined>>;
  details?: string;
  setDetails?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

type LabelType = 'Home' | 'Work' | 'Partner' | 'Other';

const InputModal = ({
  name,
  setName,
  setVisible,
  visible,
  details,
  setDetails,
}: Props) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onDismiss={() => setVisible(false)}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <Pressable
          onPressOut={() => setVisible(false)}
          style={styles.centeredView}>
          <Pressable style={styles.modalView}>
            <Text style={styles.modalText}>Address Information</Text>
            <View style={styles.inputStyleModal}>
              <CustomInput
                title="Address name"
                value={name}
                onChangeText={setName}
              />
              <CustomInput
                title="City"
                value={details}
                onChangeText={setDetails}
              />
              <View style={styles.btnContainerModal}>
                <CustomButton
                  containerStyle={styles.button}
                  textStyle={styles.textStyle}
                  title="OKAY"
                  onPress={() => {
                    setVisible(!visible);
                  }}
                />
                <CustomButton
                  containerStyle={styles.button}
                  textStyle={styles.textStyle}
                  title="CANCEL"
                  onPress={() => {
                    setVisible(!visible);
                  }}
                />
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const AddressEdit = ({
  navigation,
  route,
}: RootStackScreensProps<'AddressEdit'>) => {
  const [location, setLocation] = useState<GeoPosition | null>(null);
  const userInfo = useContext(UserContext);
  const [name, setName] = useState<string>();
  const [details, setDetails] = useState<string>();
  const [extDetails, setExtDetails] = useState<string>();
  const [label, setLabel] = useState<LabelType>();
  const [deliveryInstructions, setDeliveryInstructions] = useState<string>();
  const [visible, setVisible] = useState(false);

  const setLabelHandler = (labelData: LabelType) => {
    setLabel(previousState => {
      if (previousState === labelData) {
        return undefined;
      }
      return labelData;
    });
  };

  const upsertLocationHandler = async () => {
    try {
      if (!route.params.edit) {
        const {message, statusCode} = await addAddress(
          name,
          details,
          location?.coords.latitude ?? 12.9010875,
          location?.coords.longitude ?? 77.6095084,
          extDetails,
          label,
          deliveryInstructions,
          userInfo.token,
        );
        if (statusCode !== 201) {
          return Alert.alert('Error!', message, undefined, {
            cancelable: true,
          });
        }
        return navigation.goBack();
      }
      const {message, statusCode} = await editAddress(
        route.params.address?.id,
        name,
        details,
        location?.coords.latitude ?? 12.9010875,
        location?.coords.longitude ?? 77.6095084,
        extDetails,
        label,
        deliveryInstructions,
        userInfo.token,
      );
      if (statusCode !== 200) {
        return Alert.alert('Error!', message, undefined, {
          cancelable: true,
        });
      }
      return navigation.goBack();
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
        enableHighAccuracy: true,
        forceRequestLocation: true,
        forceLocationManager: false,
        showLocationDialog: true,
      },
    );
  };

  useEffect(() => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then(status => {
        if (status) {
          getCurrentPosition();
          return (hasPermission.current = true);
        }
      })
      .then(() => {
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
      });
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
          onPress={upsertLocationHandler}
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
        <AddressCard
          name={name ?? route.params.address?.name ?? 'Address'}
          details={details ?? route.params.address?.details ?? 'City'}
          editOnly={true}
          onEditPress={() => setVisible(!visible)}
        />
        <CustomInput
          placeholder="Apartment"
          containerStyle={styles.inputStyle1}
          onChangeText={setExtDetails}
          value={extDetails ?? route.params.address?.extDetails}
        />
        <Spacer height={20} />
        <Text style={styles.boldText}>Delivery instructions</Text>
        <Text>Please give us more information about your address</Text>
        <CustomInput
          placeholder="(Optional) Note to rider"
          containerStyle={styles.inputStyle1}
          onChangeText={setDeliveryInstructions}
          value={
            deliveryInstructions ?? route.params.address?.deliveryInstructions
          }
        />
        <Spacer height={20} />
        <Text style={styles.boldText}>Add a label</Text>
        <View style={styles.label}>
          <View style={styles.iconView}>
            <View
              style={[
                styles.icon,
                label === 'Home' ? styles.onLabelSelect : null,
              ]}>
              <MaterialCommunityIcons
                name="home-outline"
                size={30}
                color={label === 'Home' ? 'white' : 'red'}
                onPress={() => setLabelHandler('Home')}
              />
            </View>
            <Text>Home</Text>
          </View>
          <View style={styles.iconView}>
            <View
              style={[
                styles.icon,
                label === 'Work' ? styles.onLabelSelect : null,
              ]}>
              <MaterialCommunityIcons
                name="office-building-outline"
                size={30}
                color={label === 'Work' ? 'white' : 'red'}
                onPress={() => setLabelHandler('Work')}
              />
            </View>

            <Text>Work</Text>
          </View>
          <View style={styles.iconView}>
            <View
              style={[
                styles.icon,
                label === 'Partner' ? styles.onLabelSelect : null,
              ]}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={30}
                color={label === 'Partner' ? 'white' : 'red'}
                onPress={() => setLabelHandler('Partner')}
              />
            </View>

            <Text>Partner</Text>
          </View>
          <View style={styles.iconView}>
            <View
              style={[
                styles.icon,
                label === 'Other' ? styles.onLabelSelect : null,
              ]}>
              <MaterialCommunityIcons
                name="plus-circle-outline"
                size={30}
                color={label === 'Other' ? 'white' : 'red'}
                onPress={() => setLabelHandler('Other')}
              />
            </View>
            <Text>Other</Text>
          </View>
        </View>
      </View>
      <InputModal
        details={details}
        setDetails={setDetails}
        name={name}
        setName={setName}
        visible={visible}
        setVisible={setVisible}
      />
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

    justifyContent: 'center',
    alignItems: 'center',
  },
  iconView: {alignItems: 'center', justifyContent: 'center'},
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    backgroundColor: 'red',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.62)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: '35%',
  },
  btnContainerModal: {
    flexDirection: 'row-reverse',
    width: '100%',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: '#65a6f0',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  inputStyleModal: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onLabelSelect: {backgroundColor: 'red', borderRadius: 25},
});

export default AddressEdit;
