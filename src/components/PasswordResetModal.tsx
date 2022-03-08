import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, ModalProps} from 'react-native';
import CustomButton from './CustomButton';
import CustomInput from './TextInput';

export interface Props extends ModalProps {
  setResetPassVisible: React.Dispatch<React.SetStateAction<boolean>>;
  resetPassVisible: boolean;
}

const PasswordReset = ({resetPassVisible, setResetPassVisible}: Props) => {
  const [otp, setOtp] = useState('');
  const [newpass, setNewPass] = useState('');
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={resetPassVisible}
        onDismiss={() => setResetPassVisible(false)}
        onRequestClose={() => {
          setResetPassVisible(!resetPassVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Password Reset</Text>
            <View style={styles.inputStyle}>
              <CustomInput
                title="OTP"
                containerStyle={styles.inputContainer}
                placeholder="Enter Your OTP"
                value={otp}
                onChangeText={setOtp}
              />
              <CustomInput
                title="New Password"
                containerStyle={styles.inputContainer}
                placeholder="Enter Your new password"
                value={newpass}
                onChangeText={setNewPass}
              />
              <View style={styles.btnContainer}>
                <CustomButton
                  containerStyle={styles.button}
                  textStyle={styles.textStyle}
                  title="OKAY"
                />
                <CustomButton
                  containerStyle={styles.button}
                  textStyle={styles.textStyle}
                  title="CANCEL"
                  onPress={() => {
                    setResetPassVisible(!resetPassVisible);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    margin: 1,
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

export default PasswordReset;
