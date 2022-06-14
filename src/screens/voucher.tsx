import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Container from '../components/Container';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import CustomInput from '../components/TextInput';
import {RootStackScreensProps} from '../navigators/root-stack';

const Voucher = ({navigation}: RootStackScreensProps<'Voucher'>) => {
  const [voucher, setVoucher] = useState<string>();
  const onApply = () => {
    navigation.goBack();
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
