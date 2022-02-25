import React, {useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {Text} from 'react-native-elements';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/TextInput';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container}>
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

      <View style={styles.btnView}>
        <CustomButton
          title="Continue"
          btnStyle={styles.btn}
          textStyle={styles.btnText}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
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
    width: '50%',
  },
  signUpBtn: {
    width: '30%',
    marginEnd: 130,
  },
  btnText: {
    color: 'white',
  },
  btnText2: {
    color: '#65a6f0',
  },
  forgotBtn: {
    width: '30%',
    marginEnd: 213,
    marginBottom: 35,
  },
  text2: {
    marginLeft: 36,
  },
});
