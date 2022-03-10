import React, {useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {Text} from 'react-native-elements';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/TextInput';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RootStackScreensProps} from '../navigators/root-stack';
import Spacer from '../components/Spacer';

const SignUp = ({navigation}: RootStackScreensProps<'SignUp'>) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.KeyboardAwareContainer}>
        <View style={styles.upperView2}>
          <View style={styles.upperView}>
            <Text style={styles.text3}>Create an account</Text>
            <Spacer />
            <Text style={styles.text5}>
              By continuing, you agree to our{' '}
              <Text selectable={true} style={styles.btnText2}>
                User Agreement
              </Text>{' '}
              and{' '}
              <Text selectable={true} style={styles.btnText2}>
                Privacy Policy
              </Text>
            </Text>
          </View>
          <Spacer height={30} />
          <View>
            <CustomButton
              textStyle={styles.btnText2}
              btnStyle={styles.google}
              title="Continue with Google"
            />
            <Spacer height={20} />
            <CustomButton
              btnStyle={styles.google}
              textStyle={styles.btnText2}
              title="Continue with Facbook"
            />
            <Spacer height={30} />
          </View>
        </View>

        <View style={styles.orStyle}>
          <Text style={styles.text4}>OR</Text>
        </View>
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
        </View>
        <View style={styles.signUp}>
          <Text style={styles.text2}>Have an Account?</Text>
          <CustomButton
            title="Log in"
            btnStyle={styles.signUpBtn}
            textStyle={styles.btnText2}
            onPress={() => navigation.navigate('Login')}
          />
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
  },
  KeyboardAwareContainer: {},
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btn: {
    width: '100%',
    backgroundColor: '#e3d809',
    borderRadius: 100,
  },
  btnView: {
    flexDirection: 'row',
  },
  signUp: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },
  signUpBtn: {
    width: '20%',
    marginEnd: '90%',
  },
  btnText: {
    color: 'white',
  },
  btnText2: {
    color: '#65a6f0',
  },
  text2: {},
  text3: {
    fontWeight: 'bold',
  },
  text4: {
    color: 'grey',
  },
  text5: {
    color: 'grey',
    fontSize: 10,
  },
  upperView: {
    margin: 15,
    marginTop: 50,
  },
  upperView2: {
    justifyContent: 'center',
  },
  google: {
    borderRadius: 30,
    borderWidth: 1,
    width: '100%',
    height: 60,
    borderColor: '#65a6f0',
  },
  orStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUp;
