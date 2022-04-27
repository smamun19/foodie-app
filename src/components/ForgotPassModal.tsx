import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  ModalProps,
  Pressable,
  Alert,
} from 'react-native';
import {RootStackParamList} from '../navigators/root-stack';
import {reqReset} from '../services/auth';
import CustomButton from './CustomButton';
import CustomInput from './TextInput';

export interface Props extends ModalProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
}

const CustomModal = ({modalVisible, setModalVisible, navigation}: Props) => {
  const [email, setEmail] = useState('');

  const modalHandler = async () => {
    try {
      const res = await reqReset(email);
      if (res.statusCode !== 200) {
        return Alert.alert('Error!', res.message, undefined, {
          cancelable: true,
        });
      }
      setModalVisible(!modalVisible);
      navigation.navigate('Otp', {email});
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

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          onPressOut={() => setModalVisible(false)}
          style={styles.centeredView}>
          <Pressable style={styles.modalView}>
            <Text style={styles.modalText}>Forgot your password?</Text>
            <View style={styles.inputStyle}>
              <CustomInput
                title="Email"
                containerStyle={styles.inputContainer}
                placeholder="Enter Your Email Address"
                value={email}
                onChangeText={setEmail}
              />
              <View style={styles.btnContainer}>
                <CustomButton
                  containerStyle={styles.button}
                  textStyle={styles.textStyle}
                  title="EMAIL ME"
                  onPress={modalHandler}
                />
                <CustomButton
                  containerStyle={styles.button}
                  textStyle={styles.textStyle}
                  title="CANCEL"
                  onPress={() => {
                    setModalVisible(!modalVisible);
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

const styles = StyleSheet.create({
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
    paddingHorizontal: 0,
  },
  btnContainer: {
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
  inputStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
});

export default CustomModal;
