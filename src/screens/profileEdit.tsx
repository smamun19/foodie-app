import React from 'react';
import {StyleSheet, View} from 'react-native';
import Container from '../components/Container';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import CustomInput from '../components/TextInput';
import {RootStackScreensProps} from '../navigators/root-stack';

const ProfileEdit = ({
  navigation,
  route,
}: RootStackScreensProps<'ProfileEdit'>) => {
  const textInputTitle =
    route.params.title === 'Name'
      ? 'This is how we will address you'
      : route.params.title === 'Email'
      ? 'Make sure we can reach at your email'
      : route.params.title === 'Password'
      ? 'Go for at least 6 characters'
      : route.params.title === 'Mobile'
      ? 'Make sure we can reach you'
      : undefined;
  return (
    <Container
      containerStyle={styles.containerStyle}
      header={
        <CustomHeader
          title={route.params.title}
          onLeftPress={() => navigation.goBack()}
        />
      }
      footer={
        <CustomButton
          onPress={() => console.log('working')}
          containerStyle={styles.btnContainer}
          btnStyle={styles.btn}
          textStyle={styles.btnText}
          title="Update"
        />
      }>
      {route.params.title === 'Password' ? (
        <View>
          <CustomInput
            placeholder="Current Password"
            containerStyle={styles.inputStyle}
            title={textInputTitle}
          />
          <CustomInput
            placeholder="New Password"
            containerStyle={styles.inputStyle1}
          />
        </View>
      ) : (
        <CustomInput
          containerStyle={styles.inputStyle}
          title={textInputTitle}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {margin: 10},
  inputStyle: {margin: 0},
  inputStyle1: {margin: 0, marginTop: 10},
  btnContainer: {
    padding: 10,
    height: 60,
    borderTopWidth: 0.5,
    borderTopColor: '#6b6b6b',
    paddingHorizontal: 10,
  },
  btn: {
    backgroundColor: 'red',
    borderRadius: 5,
    width: '100%',
    height: '100%',
  },
  btnText: {color: 'white'},
});

export default ProfileEdit;
