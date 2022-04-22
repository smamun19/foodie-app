import React, {useState} from 'react';
import {StyleSheet, Text, View, ModalProps, Alert} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/TextInput';
import Spacer from '../components/Spacer';

import {RootStackScreensProps} from '../navigators/root-stack';

export interface Props extends ModalProps {
  setResetPassVisible: React.Dispatch<React.SetStateAction<boolean>>;
  resetPassVisible: boolean;
}

const ResetPassword = ({
  navigation,
}: RootStackScreensProps<'ResetPassword'>) => {
  const [newpass, setNewPass] = useState('');

  const submitHandler = () => {
    Alert.alert('Success!', 'Your password has been reset successfully', [
      {onPress: () => navigation.navigate('Login')},
    ]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.modalText}>Reset Password</Text>
      <View style={styles.inputStyle}>
        <CustomInput
          title="Password"
          containerStyle={styles.inputContainer}
          placeholder="Enter your new password here"
          value={newpass}
          onChangeText={setNewPass}
        />
        <CustomButton
          containerStyle={styles.button}
          textStyle={styles.textStyle}
          title="Submit"
          onPress={submitHandler}
        />
        <Spacer />
        <CustomButton
          containerStyle={styles.button2}
          textStyle={styles.textStyle}
          title="Back to Sign in"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5%',
  },

  button: {
    width: '30%',
  },
  button2: {
    width: '50%',
  },

  textStyle: {
    color: '#65a6f0',
    fontWeight: 'bold',
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

export default ResetPassword;
