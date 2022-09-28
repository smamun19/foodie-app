import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Container from '../components/Container';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import CustomInput from '../components/TextInput';
import {RootStackScreensProps} from '../navigators/root-stack';

const AddressEdit = ({
  navigation,
  route,
}: RootStackScreensProps<'AddressEdit'>) => {
  return (
    <Container
      containerStyle={styles.containerStyle}
      header={
        <CustomHeader
          title={!route.params.edit ? 'Add' : 'Edit'}
          onLeftPress={() => navigation.goBack()}
        />
      }
      footer={
        <CustomButton
          onPress={() => console.log('working')}
          containerStyle={styles.btnContainer}
          btnStyle={styles.btn}
          textStyle={styles.btnText}
          title="Save and continue"
        />
      }>
      {!route.params.edit ? (
        <Text>Add a new address</Text>
      ) : (
        <Text>Edit address</Text>
      )}
      <CustomInput
        placeholder="New Password"
        containerStyle={styles.inputStyle1}
      />
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

export default AddressEdit;
