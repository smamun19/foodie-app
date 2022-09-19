import React, {useContext, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Container from '../components/Container';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import CustomInput from '../components/TextInput';
import {RootStackScreensProps} from '../navigators/root-stack';
import {addVoucher} from '../services/user';
import {UserContext} from '../services/userContext';

const Voucher = ({navigation}: RootStackScreensProps<'Voucher'>) => {
  const [voucher, setVoucher] = useState<string>('');
  const userInfo = useContext(UserContext);
  const onApply = async () => {
    try {
      const res = await addVoucher(voucher, userInfo.token);
      if (res.statusCode !== 200) {
        return Alert.alert(
          'Try another voucher',
          'The voucher does not does not exist. Please check if the voucher code was typed in correctly',
        );
      }
      userInfo.addVoucher(res.details);
      navigation.navigate('Cart');
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
      header={
        <CustomHeader
          title="Apply a voucher"
          onLeftPress={() => navigation.goBack()}
        />
      }>
      <View style={styles.container}>
        <CustomInput
          placeholder="Voucher code"
          onChangeText={setVoucher}
          value={voucher}
          containerStyle={styles.textInput}
        />
        <CustomButton
          onPress={onApply}
          containerStyle={styles.applyBtn}
          title="Apply"
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center', padding: 5},
  textInput: {paddingHorizontal: 0},
  applyBtn: {backgroundColor: 'red'},
});

export default Voucher;
