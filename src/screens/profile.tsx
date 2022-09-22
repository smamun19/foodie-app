import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {DrawerScreensProps} from '../navigators/drawer';

const Profile = ({navigation}: DrawerScreensProps<'Profile'>) => {
  return (
    <Container
      header={
        <CustomHeader
          title="Profile"
          onLeftPress={() => navigation.navigate('Home')}
        />
      }>
      <Text>Profile Page</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollview: {
    flex: 1,
  },
});

export default Profile;
