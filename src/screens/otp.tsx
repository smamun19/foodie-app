import React, {useState} from 'react';
import {StyleSheet, Text, View, ModalProps, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../components/CustomButton';
import Spacer from '../components/Spacer';
import CustomInput from '../components/TextInput';
import {RootStackScreensProps} from '../navigators/root-stack';
import {sendOtp, verifyOtp} from '../services/auth';

export interface Props extends ModalProps {
  setResetPassVisible: React.Dispatch<React.SetStateAction<boolean>>;
  resetPassVisible: boolean;
}

const Otp = ({navigation, route}: RootStackScreensProps<'Otp'>) => {
  const [otp, setOtp] = useState('');
  const {email, fromSignup} = route.params;
  const otpHandler = async () => {
    const res = await verifyOtp(email, otp);
    if (res.details === false) {
      return Alert.alert(
        'Error!',
        'Unable to verify the email address. Please try again',
        undefined,
        {
          cancelable: true,
        },
      );
    }
    fromSignup
      ? Alert.alert(
          'Verified!',
          'You have successfully verified the email address',
          [
            {
              onPress: () => {
                navigation.navigate('Login');
              },
              style: 'destructive',
              text: 'Go back to login',
            },
          ],
        )
      : navigation.navigate('ResetPassword', {email});
  };

  const resendOtpHandler = async () => {
    try {
      const res = await sendOtp(email);
      if (res.statusCode !== 200) {
        return Alert.alert(
          'Error!',
          'Unable to send OTP. Please try again later',
          undefined,
          {
            cancelable: true,
          },
        );
      }
      Alert.alert(
        'Success!',
        `An email has been sent to ${email}. Please check your inbox`,
        undefined,
        {
          cancelable: true,
        },
      );
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
      <Text style={styles.modalText}>Confirmation Code</Text>
      <View style={styles.inputStyle}>
        <CustomInput
          title="OTP"
          containerStyle={styles.inputContainer}
          placeholder="Enter your OTP"
          value={otp}
          onChangeText={setOtp}
        />
        <CustomButton
          containerStyle={styles.button}
          textStyle={styles.textStyle}
          title="Verify"
          onPress={otpHandler}
        />
        <Spacer />
        <Spacer />
        <Text style={styles.modalText}>Haven't recieved the OTP yet?</Text>
        <CustomButton
          containerStyle={styles.button}
          textStyle={styles.textStyle}
          title="Resend"
          onPress={resendOtpHandler}
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

export default Otp;
