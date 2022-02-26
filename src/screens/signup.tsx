import React, {useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {Text} from 'react-native-elements';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/TextInput';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RootStackScreensProps} from '../navigators/root-stack';

const SignUp = ({navigation}: RootStackScreensProps<'SignUp'>) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.KeyboardAwareContainer}>
        <View style={styles.inputContainer}>
          <CustomInput
            title="Email"
            placeholder="Enter Your Email Address"
            value={email}
            onChangeText={setEmail}
          />
          <CustomInput
            title="Name"
            placeholder="Enter Your Full Name"
            value={name}
            onChangeText={setName}
          />
          <CustomInput
            title="Password"
            placeholder="Enter Your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <View style={styles.signUp}>
            <Text style={styles.text2}>Already have an Account?</Text>
            <CustomButton
              title="Log in"
              btnStyle={styles.signUpBtn}
              textStyle={styles.btnText2}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView>
        <View style={styles.btnView}>
          <CustomButton
            title="Continue"
            btnStyle={styles.btn}
            textStyle={styles.btnText}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  KeyboardAwareContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'baseline',
    width: '100%',
  },
  btn: {
    width: '100%',
    backgroundColor: 'grey',
    borderRadius: 100,
  },
  btnView: {
    flexDirection: 'row',
  },
  signUp: {
    flexDirection: 'row',
    alignItems: 'baseline',
    width: '60%',
  },
  signUpBtn: {
    width: '40%',
    marginEnd: 210,
  },
  btnText: {
    color: 'white',
  },
  btnText2: {
    color: '#65a6f0',
  },
  forgotBtn: {
    width: '40%',
    marginStart: 14,
  },
  forgotBtnArea: {},
  text2: {
    marginLeft: 36,
  },
});

export default SignUp;
