import React, {useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {Text} from 'react-native-elements';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/TextInput';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RootStackScreensProps} from '../navigators/root-stack';
import Spacer from '../components/Spacer';

const Login = ({navigation}: RootStackScreensProps<'Login'>) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.KeyboardAwareContainer}>
        <View style={styles.upperView}>
          <Text style={styles.text3}>Log in to Foodie</Text>
        </View>
        <Spacer height={30} />
        <View>
          <CustomButton
            textStyle={styles.btnText2}
            btnStyle={styles.google}
            title="Continue with Google"
          />
          <Spacer height={30} />
          <CustomButton
            btnStyle={styles.google}
            textStyle={styles.btnText2}
            title="Continue with Facbook"
          />
          <Spacer height={30} />
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
            title="Password"
            placeholder="Enter Your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <View style={styles.signUp}>
            <Text style={styles.text2}>New to Foodie?</Text>
            <CustomButton
              title="Sign Up"
              btnStyle={styles.signUpBtn}
              textStyle={styles.btnText2}
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
          <View>
            <CustomButton
              title="Forgot Password"
              textStyle={styles.btnText2}
              btnStyle={styles.forgotBtn}
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
  KeyboardAwareContainer: {},
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'baseline',
    marginTop: 20,
    width: 400,
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
    alignItems: 'baseline',
    width: '50%',
  },
  signUpBtn: {
    width: '40%',
    marginEnd: 100,
  },
  btnText: {
    color: 'white',
  },
  btnText2: {
    color: '#65a6f0',
  },
  forgotBtn: {
    width: '40%',
    marginTop: 20,
  },
  forgotBtnArea: {},
  text2: {
    marginLeft: 36,
  },
  text3: {
    fontWeight: 'bold',
  },
  text4: {
    color: 'grey',
  },
  upperView: {
    marginLeft: '9%',
    flex: 1,
    marginTop: 50,
  },
  google: {
    borderRadius: 30,
    borderWidth: 1,
    width: '90%',
    height: 60,
    borderColor: '#65a6f0',
  },
  orStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
