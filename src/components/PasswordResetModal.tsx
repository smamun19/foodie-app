import React, {useState} from 'react';
import {Modal, StyleSheet, View, ModalProps, Pressable} from 'react-native';
import CustomButton from './CustomButton';
import CustomInput from './TextInput';
import ThemedText from './ThemedText';

export interface Props extends ModalProps {
  setResetPassVisible: React.Dispatch<React.SetStateAction<boolean>>;
  resetPassVisible: boolean;
}

const PasswordReset = ({resetPassVisible, setResetPassVisible}: Props) => {
  const [otp, setOtp] = useState('');
  const [newpass, setNewPass] = useState('');

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={resetPassVisible}
        onDismiss={() => setResetPassVisible(false)}
        onRequestClose={() => {
          setResetPassVisible(!resetPassVisible);
        }}>
        <Pressable
          onPressOut={() => setResetPassVisible(false)}
          style={styles.centeredView}>
          <Pressable style={styles.modalView}>
            <ThemedText style={styles.modalText}>Password Reset</ThemedText>
            <View style={styles.inputStyle}>
              <CustomInput
                title="OTP"
                placeholder="Enter Your OTP"
                value={otp}
                onChangeText={setOtp}
              />
              <CustomInput
                title="New Password"
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
  },
  inputStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PasswordReset;
