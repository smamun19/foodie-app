import React, {useState} from 'react';
import {StyleSheet, View, ModalProps, Alert} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/TextInput';
import Spacer from '../components/Spacer';

import {RootStackScreensProps} from '../navigators/root-stack';
import {resetPass} from '../services/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ThemedText from '../components/ThemedText';

export interface Props extends ModalProps {
  setResetPassVisible: React.Dispatch<React.SetStateAction<boolean>>;
  resetPassVisible: boolean;
}

const ResetPassword = ({
  navigation,
  route,
}: RootStackScreensProps<'ResetPassword'>) => {
  const [newpass, setNewPass] = useState('');

  const {email} = route.params;

  const submitHandler = async () => {
    try {
      const res = await resetPass(email, newpass);
      if (res.statusCode !== 200) {
        return Alert.alert('Error!', res.message, undefined, {
          cancelable: true,
        });
      }
      Alert.alert('Success!', 'Your password has been reset successfully', [
        {
          onPress: () => navigation.navigate('Login'),
          style: 'destructive',
          text: 'Go back to login',
        },
      ]);
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
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.modalText}>Reset Password</ThemedText>
      <View style={styles.inputStyle}>
        <CustomInput
          title="Password"
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
    </KeyboardAwareScrollView>
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
  },
  inputStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ResetPassword;
