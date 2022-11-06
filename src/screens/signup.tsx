import React, {useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Alert} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/TextInput';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RootStackScreensProps} from '../navigators/root-stack';
import Spacer from '../components/Spacer';
import {signup} from '../services/auth';

import ThemedText from '../components/ThemedText';

const SignUp = ({navigation}: RootStackScreensProps<'SignUp'>) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const signUpHandler = async () => {
    try {
      const res = await signup(email, name, password);

      if (res.statusCode !== 201) {
        return Alert.alert('Error!', res.message, undefined, {
          cancelable: true,
        });
      }

      return navigation.navigate('Otp', {email, fromSignup: true});
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
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.KeyboardAwareContainer}>
        <View style={styles.upperView2}>
          <View style={styles.upperView}>
            <ThemedText style={styles.text3}>Create an account</ThemedText>
            <Spacer />
            <ThemedText style={styles.text5}>
              By continuing, you agree to our{' '}
              <ThemedText selectable={true} style={styles.btnText2}>
                User Agreement
              </ThemedText>{' '}
              and{' '}
              <ThemedText selectable={true} style={styles.btnText2}>
                Privacy Policy
              </ThemedText>
            </ThemedText>
          </View>
          <Spacer height={30} />
          <View>
            <CustomButton
              textStyle={styles.btnText2}
              containerStyle={styles.google}
              title="Continue with Google"
            />
            <Spacer height={20} />
            <CustomButton
              containerStyle={styles.google}
              textStyle={styles.btnText2}
              title="Continue with Facbook"
            />
            <Spacer height={30} />
          </View>
        </View>

        <View style={styles.orStyle}>
          <ThemedText style={styles.text4}>OR</ThemedText>
        </View>
        <View style={styles.inputContainer}>
          <CustomInput
            title="Email"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
          />
          <CustomInput
            title="Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
          <CustomInput
            title="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.signUp}>
          <ThemedText style={styles.loginText}>Have an Account?</ThemedText>
          <CustomButton
            title="Log in"
            textStyle={styles.btnText2}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView>
        <View style={styles.btnView}>
          <CustomButton
            title="Continue"
            containerStyle={styles.btn}
            textStyle={styles.btnText}
            onPress={signUpHandler}
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
  KeyboardAwareContainer: {
    margin: 15,
  },
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
  loginText: {marginRight: 10},
});

export default SignUp;
