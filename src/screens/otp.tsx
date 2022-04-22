import React, {useState} from 'react';
import {StyleSheet, Text, View, ModalProps} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/TextInput';
import {RootStackScreensProps} from '../navigators/root-stack';

export interface Props extends ModalProps {
  setResetPassVisible: React.Dispatch<React.SetStateAction<boolean>>;
  resetPassVisible: boolean;
}

const Otp = ({navigation}: RootStackScreensProps<'Otp'>) => {
  const [otp, setOtp] = useState('');
  return (
    <View style={styles.container}>
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
          onPress={() => {
            navigation.navigate('ResetPassword');
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
