import React, {useContext, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Container from '../components/Container';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import CustomInput from '../components/TextInput';
import {RootStackScreensProps} from '../navigators/root-stack';
import {changePassword, editInfo} from '../services/user';
import {UserContext} from '../services/userContext';

const ProfileEdit = ({
  navigation,
  route,
}: RootStackScreensProps<'ProfileEdit'>) => {
  const userInfo = useContext(UserContext);

  const [data, setData] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const textInputTitle =
    route.params.title === 'name'
      ? 'This is how we will address you'
      : route.params.title === 'email'
      ? 'Make sure we can reach at your email'
      : route.params.title === 'password'
      ? 'Go for at least 6 characters'
      : route.params.title === 'phone'
      ? 'Make sure we can reach you'
      : undefined;

  const profileEditHandler = async () => {
    try {
      if (route.params.title === 'password') {
        const res = await changePassword(
          currentPassword,
          newPassword,
          userInfo.token,
        );

        if (res.statusCode !== 200) {
          return Alert.alert('Error!', res.message, undefined, {
            cancelable: true,
          });
        }

        return navigation.goBack();
      }
      const res = await editInfo({[route.params.title]: data}, userInfo.token);

      if (res.statusCode !== 200) {
        return Alert.alert('Error!', res.message, undefined, {
          cancelable: true,
        });
      }
      userInfo.hydrate({cartItem: [...userInfo.cartItem], ...res.details});
      return navigation.goBack();
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
          onPress={profileEditHandler}
          containerStyle={styles.btnContainer}
          btnStyle={styles.btn}
          textStyle={styles.btnText}
          title="Update"
        />
      }>
      {route.params.title === 'password' ? (
        <View>
          <CustomInput
            placeholder="Current Password"
            containerStyle={styles.inputStyle}
            title={textInputTitle}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <CustomInput
            placeholder="New Password"
            containerStyle={styles.inputStyle1}
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>
      ) : (
        <CustomInput
          containerStyle={styles.inputStyle}
          title={textInputTitle}
          value={data}
          onChangeText={setData}
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
